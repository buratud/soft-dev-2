import React, { useEffect, useState, useContext } from 'react'
import "./Blogger.scoped.css"
import Navbar from '../component/Nav'
import img1 from '../../src/Assets/person-circle-outline.svg'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../App';
import { REACT_APP_BASE_API_URL } from '../config'
import { IoSearch } from "react-icons/io5";

function Blogger() {
  const [data, setData] = useState([]);
  const { supabase_for_use: supabase, session, user } = useContext(AuthContext);

  useEffect(() => {
    axios.post(`${REACT_APP_BASE_API_URL}/blogger`, {

    })
      .then(res => {
        console.log(res.data)
        setData(res.data);
      })
      .catch((err) => {
        alert(err)
      })
  }, [])


  return (
    <div className="Blogger">
      <Navbar />
      <div className="main">
        <h1 className='title'>
          Our Blogger
        </h1>
        <div className='Search_Wrapper'>
          <form className='SearchBox'>
            <div className='Search_inside'>
              <IoSearch size={25} className="icon_Search" />
              <input
                type="text"
                placeholder="Search here..."
                className='inputSearch'
              />
            </div>
            <button type='submit' className='SearchBox_btn'>Search</button>
          </form>
        </div>
        <div className="blogger_list">
          <div className="blogger_wrapper">
            {
              data.map(({ user: { username, id }, image: { avatar_url } }, index) => {
                return (
                  <div className="box">
                    <Link to={`/profile/${id}`} className="Blog1">
                      <div className="singleDest" key={index}>
                        <img src={avatar_url ?? img1} alt="" />
                      </div>
                      <div className="userwrite">
                        {username}
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blogger