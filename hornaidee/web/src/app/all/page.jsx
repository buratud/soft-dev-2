"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReactStars from "react-stars";
import axios from "axios";
import { useParams } from "next/navigation";
import styles from "./style.module.css";
import RangeSlider from '../../../components/slider';

import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_BASE_API_URL,
  NEXT_PUBLIC_BASE_WEB_PATH
} from "../../../config";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function DormReview() {
  const [searchText, setSearchText] = useState('');
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10000);

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

  return (
    <>
      <title>Dorms | All  </title>
      <div className={styles.container}>
        <div className={styles.seachMain}>
          <div className={styles.search_Top}>
            <div className={styles.searchBar}>
              <div>
                <Image alt="globe" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/Globe2.svg`} height={20} width={20} />
                <span> |</span>
              </div>
              <input
                type="text"
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
          <div>

          </div>
        </div>
      </div>
    </>
  );
}
