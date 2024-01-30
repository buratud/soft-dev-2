
import { useEffect, useState } from "react"
import Bt2 from "../components/bt2"
import Card_previwe from "../components/card_preview"
import Facility_choice from "../components/facility_choice"
import Help from "../components/help"
import Navbar from "../components/nav"
import Safety_choice from "../components/safety_choice"
import "./manage_detail.scoped.css"
import Footer from "../components/footer"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { dark } from "@mui/material/styles/createPalette"
import Bt1 from "../components/bt1"
import Confirm from "../components/confirm"
import { baseApiUrl } from "../config"

function Manage_detail() {
    const location = useLocation();
    const {dormID} = useParams();
    const [dormData , setDormData] = useState({});
    const [ confirmStatus , setConfirmStatus] = useState(false);
    const navi = useNavigate();

    useEffect(() => {
        const url = `${baseApiUrl}/detail/`+dormID
        axios.get(url).then((response) =>{
        setDormData(response.data);
        console.log(response.data);
        // console.log(JSON.parse(response.data.url));
        }).catch((err) =>{
            navi("/error")
            console.log(err);
        });
      },[location]);

    const updateDorm = () => {
        axios.put(`${baseApiUrl}/update`, {dorm : dormData})
        console.log(dormData)
        console.log("send update")
        alert("edit success")
    }

    const deleteDorm = () => {
        console.log("delete"+dormID)
        axios.delete(`${baseApiUrl}/delete/`+dormID).then(()=>{
            navi("/login")
        })
    }

    const editDorm = (event) => {
        const {name,value} = event.target;
        setDormData((prevDorm) => {
            return {
                ...prevDorm,
                [name] : value
            }
        })
    }


    return (
        <div className="flex items-center flex-col">
            <div className="w-full"><Navbar></Navbar></div>
            <div className="content bg-old_yellow p-8 rounded-2xl my-4">
                <div className="w-full flex justify-center pb-8"><Card_previwe dorm={dormData}/></div>
                <div className="bg-white p-4 rounded-xl border border-solid border-black">

                    {/* donrm name */}
                    <div className="dorm_name mb-6">
                        <div className="topic text-old_green text-2xl mb-4">ชื่อหอพัก</div>
                        <div className="input flex">
                            <input className="input_text" name="dorm_name" value={dormData.dorm_name} onChange={editDorm} type="text" />
                            
                        </div>          
                    </div>

                    {/* price */}
                    <div className="price_range mb-6">
                        <div className="topic text-old_green text-2xl mb-4">ราคา(บาท)</div>
                        <div className="input flex">
                            <input className="input_num" name="min_price" value={dormData.min_price} onChange={editDorm} type="number" />
                            <div className="line"></div>
                            <input className="input_num" name="max_price" value={dormData.max_price} onChange={editDorm}  type="number" />
                            
                        </div>
                    </div>

                    <div className="flex justify-between w-3/4 mb-6" >
                        {/* distance */}
                        <div className="distance">
                            <div className="topic text-old_green text-2xl mb-4">ระยะทางจากมอ(ม.)</div>
                            <div className="input flex">
                                <input className="input_num" name="distance" value={dormData.distance} onChange={editDorm} type="number" />
                                
                            </div>
                        </div>

                        {/* size */}
                        <div className="room_size">
                            <div className="topic text-old_green text-2xl mb-4">ขนาดห้อง(ตร.ม.)</div>
                            <div className="input flex">
                                <input className="input_num" type="number" name="size" value={dormData.size} onChange={editDorm}/>
                                
                            </div>
                        </div>
                    </div>
                    
                    {/* wifi */}
                    <div className="room_size mb-6">
                            <div className="topic text-old_green text-2xl mb-4">wifi(บาท)</div>
                            <div className="input flex">
                                <input className="input_num" type="text" name="wifi" value={dormData.wifi} onChange={editDorm}/>
                                
                            </div>
                        </div>

                    <div className="flex justify-between w-2/3">


                        {/* Facility */}
                        <div className="Facility mb-4">
                            <div className="topic text-old_green text-2xl mb-2">สิ่งอำนวยความสะดวก</div>
                            <Facility_choice dormData={dormData} setDormData={setDormData}></Facility_choice>
                        </div>

                        {/* safety */}
                        <div className="safety mb-4">
                            <div className="topic text-old_green text-2xl mb-2">ความปลอดภัย</div>
                            <Safety_choice dormData={dormData} setDormData={setDormData}></Safety_choice>
                        </div>
                    </div>

                    {/* address */}
                    <div className="address mb-4">
                        <div className="topic text-old_green text-2xl mb-2">ที่อยู่หอพัก</div>
                        <div className="flex">
                            <textarea name="address" value={dormData.address} onChange={editDorm} className="input_area h-20"></textarea>
                            
                        </div>
                    </div>


                    {/* more info */}
                    <div className="more_info mb-4">
                        <div className="topic text-old_green text-2xl mb-2">รายระเอียดเพิ่มเติม</div>
                        <div className="flex">
                            <textarea name="more_info" value={dormData.more_info} onChange={editDorm}  className="input_area h-20"></textarea>
                            
                        </div>
                    </div>
                    <div className="flex w-96 justify-between">
                        <Bt2 Width="175px" Height="50px" onChange={updateDorm}>แก้ไข</Bt2>
                        <Bt2 Width="175px" Height="50px" onChange={()=>{setConfirmStatus(!confirmStatus)}}>ลบ</Bt2>
                    </div>
                    
                </div>
            </div>
            <Confirm status={confirmStatus} setStatus={setConfirmStatus} confirm={deleteDorm}/>
            <Help></Help>
            <Footer></Footer>
        </div>
    )
}

export default Manage_detail

//{"dorm_id": 0,"owner_id": 0,"dorm_name": "","min_price": 0,"max_price": 0,"distance": 0,"url": "","wifi": "0","address": "a","more_info": "m","size": 0,"water_heater": 1,"TV": 1,"air": 1,"fridge": 1,"bike": 1,"car": 1,"fitness": 1,"washer": 1,"pool": 1,"key": 1,"key_card": 1,"camera": 1,"guard": 1,"finger_print": 1}