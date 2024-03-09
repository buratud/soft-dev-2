"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import styles from "./style.module.css";
import RangeSlider from '../../../components/slider';
import CardDorm from "../../../components/CardDorm";
import search from "./search.js";

import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_BASE_API_URL,
  NEXT_PUBLIC_BASE_WEB_PATH
} from "../../../config";
import { createClient } from "@supabase/supabase-js";


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
);


export default function DormSearch() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10000);
  const [facilities, setFacilities] = useState([]);

  const [Data, setData] = useState([]);//เอาไว้ใช้เก็บข้อมูลที่ดึงมาแต่ตอนนี้ยังใช้ fake data ไปก่อน

  useEffect(() => {
    handleSearch();
  }, [Data]);

  const handleMinChange = (newValue) => {
    setMinValue(newValue);
  };

  const handleMaxChange = (newValue) => {
    setMaxValue(newValue);
  };

  const handleSearch = () => {
    axios.get(`${NEXT_PUBLIC_BASE_API_URL}/dorms`)
      .then(res => {
        setData(res.data);
      })
    // ทำการค้นหา dorms ที่มีชื่อที่ตรงหรือใกล้เคียงกับ searchText และอยู่ในช่วงราคาที่กำหนด และมีสิ่งอำนวยความสะดวกที่เลือก
    const dormsList = Data
    let filteredDorms;
    dormsList.map(dorm => {
      dorm.dorms_facilities_name = dorm.dorms_facilities.map(facility => facility.facilities.name).slice(0, 3).join(', ');
      dorm.dorms_facilities = dorm.dorms_facilities.map(facility => facility.facilities.id)
      dorm.photos = dorm.photos.map(photo => photo.photo_url)[0]
      dorm.stars = dorm.stars
      return dorm;
    });

    if (facilities == []) {
      filteredDorms = dormsList
    } else {
      filteredDorms = dormsList.filter(dorm => {
        const facilitiesID = dorm.dorms_facilities
        for (const facility of facilities) {
          if (!facilitiesID.includes(facility)) {
            return false
          }
        }
        return true
      })
    }

    if (filteredDorms.length === 0) {
      setSearchResults([]);
      return;
    }

    filteredDorms = filteredDorms.filter(dorm => dorm.rent_price >= minValue && dorm.rent_price <= maxValue);

    if (filteredDorms.length === 0) {
      setSearchResults([]);
      return;
    }

    if (searchText != "") {
      const result = search(searchText, filteredDorms);
      if (result.notFound) {
        setSearchResults([]);
        return;
      }
      setSearchResults(result.response);
    } else {
      setSearchResults(filteredDorms);
    }
  }


  const toggleFacility = (facility) => {
    if (facilities.includes(facility)) {
      // Facility already selected, remove it
      setFacilities(facilities.filter((f) => f !== facility));
    } else {
      // Facility not selected, add it
      setFacilities([...facilities, facility]);
    }
  };

  const dorms = searchResults.map((dorm, index) => (
    <CardDorm
      key={index}
      id={dorm.id}
      dorm_name={dorm.name}
      facilities={dorm.dorms_facilities_name}
      price={dorm.rent_price}
      img={dorm.photos}
      star={dorm.stars}
    />
  ));

  return (
    <>
      <title>Dorms | All  </title>
      <div className={styles.box}>
        <div className={styles.seachMain}>
          <div className={styles.search_Top}>
            <div className={styles.searchBar}>
              <div>
                <Image alt="globe" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/Globe2.svg`} height={20} width={20} />
                <span> |</span>
              </div>
              <input
                type="text"
                placeholder="Search dormitories..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className={styles.RangeSlider}>
              <span>Price per month</span>
              <RangeSlider
                onMinChange={handleMinChange}
                onMaxChange={handleMaxChange} />
              <div>
                <p>{minValue.toLocaleString()}</p>
                <p>{maxValue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className={styles.search_Bottom}>
            <div className="m-auto text-[24px] font-bold font-Poppins">Facilities</div>
            <div className={styles.Bottom_left}>
              <div className="grid grid-cols-4 gap-4 text-[18px] font-normal mt-[1vw]">
                <label className="flex items-center gap-2 ">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(3)}
                    checked={facilities.includes(3)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Air-Conditioner
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(6)}
                    checked={facilities.includes(6)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Elevator
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(7)}
                    checked={facilities.includes(7)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Near Bus Stop
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(9)}
                    checked={facilities.includes(9)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Near Restaurants
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(5)}
                    checked={facilities.includes(5)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Free WiFi
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(4)}
                    checked={facilities.includes(4)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Pet-friendly
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(8)}
                    checked={facilities.includes(8)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Near Shopping Malls
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[80vw] m-auto  font-semibold font-Poppins text-[36px] mt-[1vw] mb-[1vw]">
        <p className="text-center mb-5">Result</p>
        <div className="grid grid-cols-2 gap-4 gap-y-8">
          {dorms}
        </div>
      </div>
    </>
  );
}

