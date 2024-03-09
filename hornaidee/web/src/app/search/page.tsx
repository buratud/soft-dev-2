'use client'
import dynamic from "next/dynamic";

const DormsSearchMaps = dynamic(() => import("../../../components/DormsSearchMaps/DormsSearchMaps"), {ssr: false});
import styles from './styles.module.scss'
import {useEffect, useReducer, useState} from "react";
import axios from "axios";
import {NEXT_PUBLIC_AZURE_MAPS_KEY, NEXT_PUBLIC_BASE_API_URL} from "../../../config";
import {Dorm, DormSearchParams} from "../../types";
import DormSearchResultCard from "../../../components/DormSearchResultCard/DormSearchResultCard";
import React from "react";
import {FaMagnifyingGlassLocation} from "react-icons/fa6";
import {AzureKeyCredential} from "@azure/core-auth";
import {KnownSearchAddressResultType, MapsSearchClient, SearchAddressResultItem} from "@azure/maps-search";
import DormSearchResultRangeSlider from "../../../components/DormSearchResultRangeSlider/DormSearchResultRangeSlider";
import {FaBus, FaPaw, FaShoppingBag, FaSnowflake, FaUtensils, FaWifi} from "react-icons/fa";
import {MdElevator} from "react-icons/md";
import DormSearchResultSlider from "../../../components/DormSearchResultSlider/DormSearchResultSlider";

const facilities = [
  {
    id: 3,
    name: "Air-Conditioner",
    icon: <FaSnowflake/>,
  },
  {
    id: 4,
    name: "Pet-Friendly",
    icon: <FaPaw/>
  },
  {
    id: 5,
    name: "Free WiFi",
    icon: <FaWifi/>
  },
  {
    id: 6,
    name: "Elevator",
    icon: <MdElevator/>
  },
  {
    id: 7,
    name: "Near Bus Stop",
    icon: <FaBus/>
  },
  {
    id: 8,
    name: "Near Shopping Malls",
    icon: <FaShoppingBag/>
  },
  {
    id: 9,
    name: "Near Restaurants",
    icon: <FaUtensils/>
  }
];

const paramReducer = (state: DormSearchParams, action: {
  type: string,
  value: number,
  isActive?: boolean
}): DormSearchParams => {
  if (action.type === "minPrice") {
    return {...state, price: {...state.price, min: action.value}};
  } else if (action.type === "maxPrice") {
    return {...state, price: {...state.price, max: action.value}};
  } else if (action.type === "minRating") {
    return {...state, rating: {...state.rating, min: action.value}};
  } else if (action.type === "maxRating") {
    return {...state, rating: {...state.rating, max: action.value}};
  } else if (action.type === "distance") {
    return {...state, distance: action.value * 1000};
  } else if (action.type === "facility") {
    let facility = state.facilities;
    if (action.isActive) {
      facility.push(action.value);
    } else {
      console.log("REMOVE", action.value)
      facility = facility.filter((value) => value !== action.value);
    }
    return {...state, facilities: facility};
  }
}

export default function Page() {
  const client = new MapsSearchClient(new AzureKeyCredential(NEXT_PUBLIC_AZURE_MAPS_KEY));
  const [data, setData] = useState<Dorm[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<SearchAddressResultItem[]>([]);
  const [noPoi, setNoPoi] = useState<boolean>(false);
  const [origin, setOrigin] = useState<number[]>([100.514266205884, 13.8188104311351]);
  const [searchParams, dispatch] = useReducer(paramReducer, {
    price: {
      min: 0,
      max: 10000,
    },
    rating: {
      min: 0,
      max: 5,
    },
    distance: 20000,
    facilities: [],
  });
  useEffect(() => {
    // Form a query string from searchParams and origin
    const params = new URLSearchParams();
    const facility = searchParams.facilities.join(",");
    params.append("latOrigin", origin[1].toString());
    params.append("longOrigin", origin[0].toString());
    params.append("radius", searchParams.distance.toString());
    params.append("minPrice", searchParams.price.min.toString());
    params.append("maxPrice", searchParams.price.max.toString());
    params.append("minStar", searchParams.rating.min.toString());
    params.append("maxStar", searchParams.rating.max.toString());
    params.append("faliclites", facility);
    axios.get(`${NEXT_PUBLIC_BASE_API_URL}/v2/search?${params.toString()}`)
      .then((response) => {
          console.log(response.data);
          setData(response.data);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams, origin]);
  useEffect(() => {
    console.log("SETTTTT")
    navigator.geolocation.getCurrentPosition(loc => {
      setOrigin([loc.coords.longitude, loc.coords.latitude]);
    }, () => {
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
          <DormSearchResultRangeSlider onMinChange={val => dispatch({type: "minPrice", value: val})}
                                       onMaxChange={val => dispatch({type: "maxPrice", value: val})}
                                       maxValue={10000} minValue={0} step={1000}/>
          <p className={styles["label"]}>Rating</p>
          <DormSearchResultRangeSlider onMinChange={val => dispatch({type: "minRating", value: val})}
                                       onMaxChange={val => dispatch({type: "maxRating", value: val})}
                                       maxValue={5} minValue={0} step={1}/>
          <p className={styles["label"]}>Distance (Radius)</p>
          <DormSearchResultSlider onChange={ val => dispatch({type: "distance", value: val }) } initValue={20} suffix={"km"}
                                  maxValue={20} minValue={0} step={1}/>
          <p className={styles["label"]} style={{marginBottom: '10px'}}>Facilities</p>
          {facilities.map((facility, index) => (
            <label className="flex items-center gap-2 " key={facility.id}>
              <input type="checkbox"
                     onChange={e => {
                        dispatch({type: "facility", value: facility.id, isActive: e.target.checked})
                     }}
                     className="form-checkbox h-5 w-5 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
              />
              {facility.icon}{facility.name}
            </label>
          ))}

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