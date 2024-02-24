"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReactStars from "react-stars";
import axios from "axios";
import { useParams } from "next/navigation";
import styles from "./style.module.css";
import RangeSlider from '../../../components/slider';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';

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


export default function DormReview() {
  const [searchText, setSearchText] = useState('');
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10000);
  const [facilities, setFacilities] = useState([]);

  const handleMinChange = (newValue) => {
    setMinValue(newValue);
  };

  const handleMaxChange = (newValue) => {
    setMaxValue(newValue);
  };

  const handleSearch = () => {
    console.log(searchText);
    setSearchText('');
  }

  useEffect(() => {
    console.log([minValue, maxValue])
  }, [[minValue, maxValue]]);

  const toggleFacility = (facility) => {
    if (facilities.includes(facility)) {
      // Facility already selected, remove it
      setFacilities(facilities.filter((f) => f !== facility));
    } else {
      // Facility not selected, add it
      setFacilities([...facilities, facility]);
    }
  };

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
              <RangeSlider onMinChange={handleMinChange} onMaxChange={handleMaxChange} />
              <div>
                <p>{minValue}</p>
                <p>{maxValue}</p>
              </div>
            </div>
            <button onClick={handleSearch}>SEARCH</button>
          </div>

          <div className={styles.search_Bottom}>

            <div className={styles.Bottom_left}>
              <p>Facilities</p>
              <div className="flex flex-row justify-between text-[18px] font-normal mt-[1vw]">
                <div className="flex flex-col gap-4">
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
                </div>

                <div className="flex flex-col gap-4">
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
                </div>
              </div>
            </div>

            <div className={styles.Bottom_right}>
              <p>Popular Filters</p>
              <div className="flex flex-row justify-between text-[18px] font-normal mt-[1vw] flex-wrap gap-4"> {/* เพิ่ม flex-wrap */}
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

      <div className="w-[60vw]m-auto text-center font-semibold font-Poppins text-[36px] mt-[1vw]">
        <p>Result</p>
        <div>
            
        </div>
      </div>
    </>
  );
}

