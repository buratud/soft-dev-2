import React, { useState,useContext, useEffect } from "react";
import "./Profile.scoped.css";
import PostSlide from "../component/PostSlide";
import LikeSlide from "../component/LikedSlide";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import Navbar from "../component/Nav";
import Avatar from "../component/Avatar";
import "bootstrap/dist/css/bootstrap.min.css";
import Editprofile from "../component/EditProfile";
import ContactModal from "../component/ContactModel";
import { General } from '../App';
import axios from 'axios';
import { useParams } from "react-router-dom";

const Profile = () => {
  const {userId} = useParams();
  const {supabase_for_use : supabase,session,user} = useContext(General);
  const [data, setData] = useState({});
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3300/getprofile/${userId}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        alert(err);
      })
    }
    else {
      setData({
        email: user?.email,
        user_metadata: {
          username: user?.user_metadata.username,
          avatar_url: user?.user_metadata.avatar_url
        }
      })
    }
  }, [userId]);

  const [activeTab, setactiveTab] = useState("1");

  function toggle(tab) {
    if (activeTab !== tab) {
      setactiveTab(tab);
      // alert(activeTab);
    }
  }

  return (
    <div className="profile">
      <header>
        <Navbar></Navbar>
      </header>
      <div className="wrapper">
        <div className="profile__head"></div>
        <div className="head__box">
          <div className="profile__img">
            <Avatar src={data.user_metadata?.avatar_url} />
          </div>
          <div className="profile_title">
            <div className="User_name">
              <h2>{data.user_metadata?.username}</h2>
            </div>
            <div className="contact">
              <img src="mail-outline.svg" alt="" className='mail_edit' />
              <p className="email_User">{data.email}</p>
            </div>
          </div>
          <div className="edit">
            {/* ---Button triger modal--- */}
            {user?.user_metadata.username == data.user_metadata?.username ? <button className="edit__profile">
              <Editprofile
                name={data.user_metadata?.username}
                // describe={describe}
                // setDescribe={setDescribe}
              />
            </button> : ''}
          </div>
        </div>
        <div className="contents__box">
          <div className="content">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTab === "1" ? "show" : "noshow"}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  <p className="post_id">Post</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "2" ? "show" : "noshow"}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  <p className="post_id">Saved</p>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <div className="post__zone">
                  <PostSlide id={userId} />
                </div>
              </TabPane>

              <TabPane tabId="2">
                <div className="liked__zone">
                  <LikeSlide id={userId} />
                  {/* { id !== null && <LikeSlide id={id} /> } */}
                </div>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
