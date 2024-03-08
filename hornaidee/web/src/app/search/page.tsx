'use client'
import dynamic from "next/dynamic";

const DormsSearchMaps = dynamic(() => import("../../../components/DormsSearchMaps/DormsSearchMaps"), {ssr: false});
import './styles.scoped.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import {NEXT_PUBLIC_AZURE_MAPS_KEY, NEXT_PUBLIC_BASE_API_URL} from "../../../config";
import {Dorm} from "../../types";
import DormSearchResultCard from "../../../components/DormSearchResultCard/DormSearchResultCard";
import React from "react";
import {FaMagnifyingGlassLocation} from "react-icons/fa6";
import {AzureKeyCredential} from "@azure/core-auth";
import {KnownSearchAddressResultType, MapsSearchClient, SearchAddressResultItem} from "@azure/maps-search";

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
    }, () => {});
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
    <div className="dorms-container">
      <div className="map">
        <DormsSearchMaps dorms={data} origin={origin}/>
        {/* Naming is hard :( */}
        <div className="search-box-container">
          <div className="search-bar">
            <FaMagnifyingGlassLocation className="search-icon"/>
            <input className="search-box" placeholder={"Search origin"} onChange={e => setSearch(e.target.value)}/>
          </div>
          <div className="search-result">
            {noPoi ? <div className="search-result-ite  m">No result</div> :
              searchResult.slice(0, 5).map((result, index) => {
                if (result.type === KnownSearchAddressResultType.POI) {
                  return (
                    <React.Fragment key={result.id}>
                      <div key={index} className="search-result-item" onClick={() => setOriginLocation(result)}>
                        <p>{result.pointOfInterest.name}</p>
                        <sub>{result.address.freeformAddress}</sub>
                      </div>
                      <div className="divider"/>
                    </React.Fragment>
                  )
                }
              })}
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