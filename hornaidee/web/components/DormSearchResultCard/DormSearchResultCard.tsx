import styles from './DormSearchResultCard.module.scss'
import {Dorm} from "../../src/types";
import Image from "next/image";
import FacilitiesIconMap from "../FacilitiesIconMap";
import {FaStar} from "react-icons/fa";
import {Button} from "@mui/material";
import {IoIosFitness} from "react-icons/io";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import Link from "next/link";

export default function DormSearchResultCard({dorm}: { dorm: Dorm }) {
  return (
    <div className={styles["card"]}>
      <h3 className={styles["name"]}>{dorm.name}</h3>
      <div className={styles["info"]}>
        <div className={styles["image-container"]}>
          <Image src={dorm.photos[0]} alt={dorm.name} className={styles["image"]} fill/>
        </div>
        <div className={styles["detail"]}>
          <span className={styles["star-container"]}>
            <FaStar className={styles["star"]}/>&nbsp;<span
            className={styles["star-text"]}>{dorm.average_stars?.toFixed(2) ?? "No ratings"}</span>
          </span>
          <p className={styles["address"]}>{dorm.address}</p>
          <p className={styles["price"]}>{dorm.rent_price.toLocaleString()} บาท/เดือน</p>
          <p className={styles["distance"]}>{(dorm.distance / 1000).toFixed(1)} กิโลเมตร</p>
          <div className={styles["facilities"]}>
            {dorm.dorms_facilities.map((facility) => (
              <span key={facility.id} className={styles["dorm-facility"]}>
                {FacilitiesIconMap[facility.id]}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Link className={styles.button} href={`/detail/${dorm.id}`} target="_blank">
        <span>Open detail</span>&nbsp;&nbsp;<FaArrowUpRightFromSquare />
      </Link>
    </div>
  );
}