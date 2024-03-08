'use client'
import dynamic from "next/dynamic";

const DormsSearchMaps = dynamic(() => import("../../../components/DormsSearchMaps/DormsSearchMaps"), {ssr: false});
import styles from './styles.module.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import {NEXT_PUBLIC_AZURE_MAPS_KEY, NEXT_PUBLIC_BASE_API_URL} from "../../../config";
import {Dorm} from "../../types";
import DormSearchResultCard from "../../../components/DormSearchResultCard/DormSearchResultCard";
import React from "react";
import {FaMagnifyingGlassLocation} from "react-icons/fa6";
import {AzureKeyCredential} from "@azure/core-auth";
import {KnownSearchAddressResultType, MapsSearchClient, SearchAddressResultItem} from "@azure/maps-search";
import DormSearchResultSlider from "../../../components/DormSearchResultSlider/DormSearchResultSlider";
import {FaPaw, FaShoppingBag, FaSnowflake, FaUtensils, FaWifi} from "react-icons/fa";
import {MdElevator} from "react-icons/md";

export default function Page() {
  const client = new MapsSearchClient(new AzureKeyCredential(NEXT_PUBLIC_AZURE_MAPS_KEY));
  const [data, setData] = useState<Dorm[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchAddressResultItem[]>([]);
  const [noPoi, setNoPoi] = useState<boolean>(false);
  const [origin, setOrigin] = useState<number[]>([100.523186, 13.736717]);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(loc => {
      setOrigin([loc.coords.longitude, loc.coords.latitude]);
    }, () => {
    });
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!search) {
        setSearchResult([]);
        setNoPoi(false);
        return;
      }
      client.fuzzySearch({query: search, countryCodeFilter: ['TH']})
        .then((response) => {
          setSearchResult(response.results.filter((result) => result.type === KnownSearchAddressResultType.POI));
          console.log(response.results);
          response.results.some((result) => {
            return result.type === KnownSearchAddressResultType.POI;
          }) ? setNoPoi(false) : setNoPoi(true);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const setOriginLocation = (place: SearchAddressResultItem) => {
    setOrigin([place.position[1], place.position[0]])
  }

  return (
    <div className={styles["dorms-container"]}>
      <div className={styles["map"]}>
        <DormsSearchMaps dorms={data} origin={origin}/>
        <div className={styles["filter-container"]}>
          <h4>Filter</h4>
          <p className={styles["label"]}>Price</p>
          <DormSearchResultSlider onMinChange={() => {
          }} onMaxChange={() => {
          }}
                                  maxValue={10000} minValue={0} step={1000}/>
          <p className={styles["label"]}>Rating</p>
          <DormSearchResultSlider onMinChange={() => {
          }} onMaxChange={() => {
          }}
                                  maxValue={5} minValue={0} step={1}/>
          <p className={styles["label"]}>Distance (Radius)</p>
          <DormSearchResultSlider onMinChange={() => {
          }} onMaxChange={() => {
          }}
                                  maxValue={20} minValue={0} step={1}/>
          <p className={styles["label"]} style={{marginBottom: '10px'}}>Facilities</p>
          <label className="flex items-center gap-2 ">
            <input type="checkbox"
                   onChange={() => {
                   }}
                   className="form-checkbox h-5 w-5 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
            />
            <FaSnowflake /> Air-Conditioner
          </label>
          <label className="flex items-center gap-2 ">
            <input type="checkbox"
                   onChange={() => {
                   }}
                   className="form-checkbox h-5 w-5 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
            />
            <FaPaw /> Pet-Friendly
          </label>
          <label className="flex items-center gap-2 ">
            <input type="checkbox"
                   onChange={() => {
                   }}
                   className="form-checkbox h-5 w-5 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
            />
            <FaWifi /> Free WiFi
          </label>
          <label className="flex items-center gap-2 ">
            <input type="checkbox"
                   onChange={() => {
                   }}
                   className="form-checkbox h-5 w-5 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
            />
            <MdElevator /> Elevator
          </label>
          <label className="flex items-center gap-2 ">
            <input type="checkbox"
                   onChange={() => {
                   }}
                   className="form-checkbox h-5 w-5 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
            />
            <MdElevator /> Near Bus Stop
          </label>
          <label className="flex items-center gap-2 ">
            <input type="checkbox"
                   onChange={() => {
                   }}
                   className="form-checkbox h-5 w-5 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
            />
            <FaShoppingBag /> Near Shopping Malls
          </label>
          <label className="flex items-center gap-2 ">
            <input type="checkbox"
                   onChange={() => {
                   }}
                   className="form-checkbox h-5 w-5 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
            />
            <FaUtensils /> Near Restaurants
          </label>
        </div>
        {/* Naming is hard :( */}
        <div className={styles["search-box-container"]}>
          <div className={styles["search-bar"]}>
            <FaMagnifyingGlassLocation className={styles["search-icon"]}/>
            <input className={styles["search-box"]} placeholder={"Search origin"}
                   onChange={e => setSearch(e.target.value)}/>
          </div>
          <div className={styles["search-result"]}>
            {noPoi ? <div className={styles["search-result-item"]}>No result</div> :
              searchResult.slice(0, 5).map((result, index) => {
                if (result.type === KnownSearchAddressResultType.POI) {
                  return (
                    <React.Fragment key={result.id}>
                      <div key={index} className={styles["search-result-item"]}
                           onClick={() => setOriginLocation(result)}>
                        <p>{result.pointOfInterest.name}</p>
                        <sub>{result.address.freeformAddress}</sub>
                      </div>
                      <div className={styles["divider"]}/>
                    </React.Fragment>
                  )
                }
              })}
          </div>
        </div>

      </div>
      <div className={styles["result-box"]}>
        <div className={styles["filter"]}></div>
        <div className={styles["dorm-list"]}>
          {data.map((dorm, index) => (
            <React.Fragment key={dorm.id}>
              <DormSearchResultCard dorm={dorm}/>
              <div className={styles["divider"]}/>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}