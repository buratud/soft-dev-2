import './DormSearchResultCard.scss'
import {Dorm} from "../../src/types";
import Image from "next/image";
import FacilitiesIconMap from "../FacilitiesIconMap";
import {FaStar} from "react-icons/fa";

export default function DormSearchResultCard({dorm}: { dorm: Dorm }) {
  return (
    <div className="card">
      <h3 className="name">{dorm.name}</h3>
      <div className="info">
        <div className="image-container">
          <Image src={dorm.photos[0]} alt={dorm.name} className="image" fill/>
        </div>
        <div className="detail">
          <span className="star-container">
            <FaStar className="star"/>&nbsp;<span className="star-text">{dorm.average_stars?.toFixed(2) ?? "No ratings"}</span>
          </span>
          <p className="address">{dorm.address}</p>
          <p className="price">{dorm.rent_price.toLocaleString()} บาท/เดือน</p>
          <p className="distance">{(dorm.distance / 1000).toFixed(1)} กิโลเมตร</p>
          <div className="facilities">
            {dorm.dorms_facilities.map((facility) => (
              <span key={facility.id} className="dorm-facility">
                {FacilitiesIconMap[facility.id]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}