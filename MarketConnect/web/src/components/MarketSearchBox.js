import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BsCart4 } from "react-icons/bs";
import { RiLoader4Line } from "react-icons/ri";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Link from "next/link";
import "./style.css";

export default function MarketSearchBox() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingTimeout, setLoadingTimeout] = useState(null);

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        setShowResults(searchTerm !== "");

        if (!searchTerm) {
            setResults([]);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (search) {
            setLoading(true);
            
            const delayDebounceFn = setTimeout(() => {
                fetchList(search);
            }, 1000);

            setLoadingTimeout(setTimeout(() => {
                setLoading(false);
            }, 10000));

            return () => {
                clearTimeout(delayDebounceFn);
                clearTimeout(loadingTimeout);
            };
        }
    }, [search]);

    const fetchList = (searchTerm) => {
        axios.get(`https://65bb214bb4d53c0665540e31.mockapi.io/api/v1/searchlist`)
            .then(res => {
                const filteredResults = res.data.filter(item =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setResults(filteredResults);
                setLoading(false);
                clearTimeout(loadingTimeout);
                // console.log('filteredResults: ', filteredResults);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                clearTimeout(loadingTimeout);
            });
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
                {loading && (
                    <div className="loading_spinner">
                        <RiLoader4Line className="spinner_icon" />
                    </div>
                )}
                {!loading && results.length === 0 && search && (
                    <div className="not_found">
                        <AiOutlineExclamationCircle className="not_found_icon" />
                        <p>No results found</p>
                    </div>
                )}
                {!loading && results.map(result => (
                <Link href={result.url} key={result.id} style={{ textDecoration: 'none' }}>
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