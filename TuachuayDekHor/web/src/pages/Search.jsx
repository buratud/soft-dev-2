import React, { useState, useEffect, useRef } from 'react';
import "./Search.scoped.css";
import Navbar from '../component/Nav';
import img1 from '../../src/Assets/slide1.png';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Footer from "../component/footer";
import { REACT_APP_BASE_API_URL } from '../config';
import Card from '../component/Card/Card';
import { IoSearch } from "react-icons/io5";

function Search() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const location = useLocation();
    const prevSearchQuery = useRef("");

    useEffect(() => {
        axios.post(`${REACT_APP_BASE_API_URL}/search`, {
            query: searchQuery
        })
        .then(res => {
            setData(res.data);
            console.log('blog search',res.data)
            if (searchQuery === prevSearchQuery.current) {
                setSearchResult(res.data);
                setNoResults(false);
            }
        })
        .catch(err => {
            alert(err);
        });
    }, [searchQuery, prevSearchQuery]);

    useEffect(() => {
        const results = data.filter(card => 
            card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            card.users.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResult(results);
        setNoResults(results.length === 0);
    }, [searchQuery, data]);

    return (
        <div className="search">
            <Navbar />
            <div className="mainSearch">
                <div className='Search_Wrapper'>
                    <form className='SearchBox' onSubmit={(e) => {
                        e.preventDefault();
                        const results = data.filter(card => 
                            card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            card.users.username.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        setSearchResult(results);
                        setNoResults(results.length === 0);
                    }}>
                        <div className='Search_inside'>
                            <IoSearch size={25} className="icon_Search" type='submit' />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search here..."
                                className='inputSearch'
                            />
                        </div>
                        <button type='submit' className='SearchBox_btn'>Search</button>
                    </form>
                </div>

                <div className="AllBlogs">
                    {noResults && searchQuery !== '' && <p className="noResults">No results found. Please try another search.</p>}
                    <div className="grid-container">
                        {searchResult.map((card, index) => (
                            <Card
                                key={index}
                                img={card.cover_img ?? img1}
                                title={card.title}
                                Blogger={card.users.username}
                                Categories={card.blog_category.category}
                                id={card.blog_id}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className='footer'>
                <Footer/>
            </div>
            
        </div>
    );
}

export default Search;
