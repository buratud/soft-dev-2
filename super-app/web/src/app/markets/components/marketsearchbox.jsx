import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BsCart4 } from "react-icons/bs";
// import Image from "next/image";
import Link from "next/link";
import "./style.css";

export default function MarketSearchBox() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
        console.log(search)
        fetchList(search);
        setShowResults(search !== "");
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
    }, [search])

    const fetchList = (searchTerm) => {
        axios.get(`https://65bb214bb4d53c0665540e31.mockapi.io/api/v1/searchlist`)
            .then(res => {
                const filteredResults = res.data.filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setResults(filteredResults);
            })
            .catch(err => {
                console.log(err);
            });
        // console.log(results)
    }

    return (
        <main className="searchlist">
            <div className="searchbox">
                <div className="cart_logo">
                    <BsCart4 className="cart_logo_icon"/>
                </div>
                <div className="textbox_container">
                    <input className="textbox_input"
                        type="text"
                        placeholder="Search for a market"
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className={`search_results ${showResults ? 'show' : ''}`}>
                {results.map(result => (
                    <Link href={result.url} key={result.id}>
                        <div className="search_result_item">
                            <div className="search_result_item_title">
                                {result.name}
                            </div>
                            <div>
                                <img className="search_result_item_image" src={result.image} alt={result.name}/>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}