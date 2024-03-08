'use client'
import dynamic from "next/dynamic";

const DormsSearchMaps = dynamic(() => import("../../../components/DormsSearchMaps/DormsSearchMaps"), {ssr: false});
import './styles.scoped.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import {NEXT_PUBLIC_BASE_API_URL} from "../../../config";
import {Dorm} from "../../types";
import DormSearchResultCard from "../../../components/DormSearchResultCard/DormSearchResultCard";
import React from "react";
import {FaMagnifyingGlassLocation} from "react-icons/fa6";

export default function Page() {
  const [data, setData] = useState<Dorm[]>([]);
  useEffect(() => {
    axios.get(`${NEXT_PUBLIC_BASE_API_URL}/v2/search?latOrigin=13.736717&longOrigin=100.523186&radius=1000`)
      .then((response) => {
          console.log(response.data);
          setData(response.data);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="container">
      <div className="map">
        <DormsSearchMaps dorms={data}/>
        {/* Naming is hard :( */}
        <div className="search-box-container">
          <div className="search-bar">
            <FaMagnifyingGlassLocation className="search-icon"/>
            <input className="search-box" placeholder={"Search origin"}/>
          </div>
        </div>
      </div>
      <div className="result-box">
        <div className="filter"></div>
        <div className="dorm-list">
          {data.map((dorm, index) => (
            <React.Fragment key={dorm.id}>
              <DormSearchResultCard dorm={dorm}/>
              <div className="divider"/>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}