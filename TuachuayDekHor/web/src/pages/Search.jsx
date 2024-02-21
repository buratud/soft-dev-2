import React, { useState, useEffect } from 'react'
import "./Search.scoped.css"
import Navbar from '../component/Nav'
import img1 from '../../src/Assets/slide1.png'
import { useLocation, } from 'react-router-dom'
import axios from 'axios';
import Footer from "../component/footer";
import { Container } from 'reactstrap';
import { REACT_APP_BASE_API_URL } from '../config'
import Card from '../component/Card/Card';

function Search() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // const { supabase_for_use: supabase, session, user } = useContext(General);
    useEffect(() => {
        axios.post(`${REACT_APP_BASE_API_URL}/search`, {
            query: searchQuery
        })
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                alert(err);
            });
    }, [searchQuery]);

    const handleSearch = () => {
        setSearchQuery(searchQuery);
    };

    const location = useLocation();

    return (
        <div className="search">
            <Navbar/>
            <div className="mainSearch">
                <div className='input_Search'>
                    <h2>
                        Search Results for: {searchQuery}
                    </h2>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter search query..."
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="grid-container">
                    {data.map((card, index) => (

                        <Card
                            key={index}
                            img={card.image_link ?? img1}
                            title={card.title}
                            Blogger={card.user.username}
                            Categories={card.category}
                            id={card.id_post}
                        />

                    ))}
                </div>
            </div>
            <Footer></Footer>
        </div>
    )

}

export default Search


