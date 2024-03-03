import React, { useEffect, useState, useContext } from 'react';
import "./Blogger.scoped.css";
import Navbar from '../component/Nav';
import img1 from '../../src/Assets/person-circle-outline.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../App';
import { REACT_APP_BASE_API_URL, REACT_APP_MAIN_URL } from '../config';
import { IoSearch } from "react-icons/io5";
import Footer from '../component/footer';

function Blogger() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { supabase_for_use: supabase, session, user } = useContext(AuthContext);

  // Back
  useEffect(() => {
    axios.post(`${REACT_APP_BASE_API_URL}/bloggerlist`)
      .then(res => {
        console.log('blogger',res.data);
        setData(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    // ตัวแปร data คือที่ Back ต้องเอา Blogger ทั้งหมดมาใส่
    const filtered = data.filter(({ blogger }) =>
      blogger.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchInput]);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filtered = data.filter(({ blogger }) =>
      blogger.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="Blogger">
      <Navbar />
      <div className="main">
        <h1 className='title'>Our Blogger</h1>
        <div className='Search_Wrapper'>
          <form className='SearchBox' onSubmit={handleSearchSubmit}>
            <div className='Search_inside'>

              <input
                type="text"
                placeholder="Search here..."
                className='inputSearch'
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <button type='submit' className='SearchBox_btn'>
                <IoSearch size={25} className="icon_Search" />
              </button>
            </div>

          </form>
        </div>
        <div className="blogger_list">
          <div className="blogger_wrapper">
            {/* ข้อมูล backend ใส่ตรงนี้ */}
            {filteredData.map(({ blogger,id,picture }, index) => (
              <div className="box" key={index}>
                <Link to={`${REACT_APP_MAIN_URL}/profile/${blogger}`} className="Blog1">
                  <div className="singleDest">
                    <img src={picture ?? img1} alt="" />
                  </div>
                  <div className="userwrite">
                    {blogger}
                  </div>
                </Link>
              </div>
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

export default Blogger;
