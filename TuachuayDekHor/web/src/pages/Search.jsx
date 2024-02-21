import React, { useState, useEffect } from 'react'
import "./Search.scoped.css"
import Navbar from '../component/Nav'
import img1 from '../../src/Assets/slide1.png'
import { BiSolidPencil } from "react-icons/bi";
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios';
import Footer from "../component/footer";
import { Container } from 'reactstrap';
import { REACT_APP_BASE_API_URL } from '../config'
import Card from '../component/Card/Card';

function Search() {
    const [data, setData] = useState([]);
    // const { supabase_for_use: supabase, session, user } = useContext(General);
    useEffect(() => {
        axios.post(`${REACT_APP_BASE_API_URL}/search`, {

        })
            .then(res => {
                console.log(res.data)
                setData(res.data);
            })
            .catch((err) => {
                alert(err)
            })
    }, [])
    const location = useLocation();
    // const searchQuery = new URLSearchParams(location.search).get('query');

    // ใช้ค่า searchQuery ที่ได้รับจาก URL query parameter เป็นเงื่อนไขในการกรองข้อมูล Data 
    // กรองข้อมูลที่ตรงกับคำค้นหา
    // const filteredData = data.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="search">
            <header>
                <Navbar />
            </header>
            <Container>
                <div className="search_wrapper">
                    <div className='headResult'>
                        <h2>
                            Search Results for :
                            {/* <p>{searchQuery}</p> */}
                        </h2>
                    </div>
                    <div className="showResult">
                        <div className="main_content">
                            {data.map((card, index) => (
                                <Card
                                    key={index}
                                    img={card.image_link ?? card.img1}
                                    title={card.title}
                                    Blogger={card.user.username}
                                    Categories={card.category}
                                    id={card.id_post}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
            <Footer></Footer>
        </div>
    )


}

export default Search

{/* data.map(({ id_post: id, title, user: { username }, category, image_link }, index) => { */ }
{/* //     return (
//         <div className='grid-container'>
//             <div className="singleDest" key={index}>
//                 <div className="dastImage">
//                     <img src={image_link ?? img1} alt="" />
//                 </div>
//                 <div className="destFooter">
//                     <div className="destText">
//                         <h4>
//                             <Link to={`/${category}/${id}`}>{title}</Link>
//                         </h4>
//                         <span className="userwrite">
//                             <span className="name"><BiSolidPencil size={20} className="icon_pencil" />
//                                 {username}
//                             </span>
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// })

// {data.length === 0 && (
//     // ถ้าไม่พบผลการค้นหา
//     <div className="noResults">
//         <p>Sorry, no information found, please try another search.</p>
//     </div>
// )} */}