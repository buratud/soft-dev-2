import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BsCart4 } from "react-icons/bs";
import { RiLoader4Line } from "react-icons/ri";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { REACT_APP_BASE_WEB_URL } from "../config";
import "./MarketSearchBox.scoped.css";

export default function MarketSearchBox() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState({
        "response": [],
        "notFound": true,
        "online": true,
    });
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingTimeout, setLoadingTimeout] = useState(null);

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        setShowResults(searchTerm !== "");

        if (!searchTerm) {
            setResults({
                "response": [],
                "notFound": true,
                "online": true,
            });
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
        axios.post(`${BASE_API_URL}/search`, {
                searchTerm: searchTerm
            })
        // axios.get('https://65bb214bb4d53c0665540e31.mockapi.io/api/v1/searchlist')   // Send GET to mock API endpoint
            .then(res => {
                // Filter results
                // const filteredResults = res.data.filter(item =>
                //     item.Food_Name.toLowerCase().includes(searchTerm.toLowerCase())
                // );
                // console.log('filteredResults : ', filteredResults)
                // setResults(filteredResults);

                // Raw results
                console.log("res.data : ", res.data)
                setResults(res.data);

                setLoading(false);
                clearTimeout(loadingTimeout);
                // console.log('filteredResults: ', filteredResults);
            })
            .catch(err => {
                console.error(err);
        
                if (axios.isCancel(err)) {
                    // Request canceled (probably due to component unmounting)
                } else if (err.response) {
                    // The request was made, but the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error('Server responded with non-2xx status:', err.response.status);
                } else if (err.request) {
                    // The request was made, but no response was received
                    console.error('No response received:', err.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error setting up request:', err.message);
                }
        
                setLoading(false);
                clearTimeout(loadingTimeout);

                // Unknow bug
                setResults(prevResults => ({
                    ...prevResults,
                    response: [],
                    notFound: true,
                    online: false,
                  }));
                  
            });
        };

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
                {!loading && search && results.online === true && results.notFound === true && (
                    <div className="not_found">
                        <AiOutlineExclamationCircle className="not_found_icon" />
                        <p>No results found</p>
                    </div>
                )}
                {results.online === false && results.notFound === true && (
                    <div className="not_found">
                        <AiOutlineExclamationCircle className="not_found_icon" />
                        <p>Something went wrong</p>
                    </div>
                )}
                {!loading && results.response.map(result => (
                <a href={`${REACT_APP_BASE_WEB_URL}/fooddetail/${result.id}`} key={result.id} style={{ textDecoration: 'none' }}>
                    <div className="search_result_item">
                        <div className="search_result_item_title">{result.Food_Name}</div>
                        <div className="search_result_item_price">{result.Price} ฿</div>
                        <div>
                            <img className="search_result_item_image" src={result.URL} alt={result.Food_Name}/>
                        </div>
                    </div>
                </a>
                ))}
            </div>
        </main>
    );
}