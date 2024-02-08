"use client"
import Navbar from "../../../components/navbar";
import Footer from "../../../components/footer";
import React, { useState, useRef } from "react";
import { nation } from "./nation";
import {NEXT_PUBLIC_BASE_API_URL} from '../../../config'

export default function Home() {
    const [stepList, setStepList] = useState([{ step: "", image1: null, image2: null, image1Base64: "", image2Base64: "" }]);
    const fileInputRefs1 = useRef([]);
    const fileInputRefs2 = useRef([]);

    const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        nation: nation[0].code,
        type: "อาหารคาว",
        details: "",
    });

    const addStep = () => {
        setStepList([...stepList, { step: "", image1: null, image2: null, image1Base64: "", image2Base64: "" }]);
    };

    const handleImageChange = (e, index, imageNumber) => {
        const file = e.target.files[0];
        const list = [...stepList];
    
        if (imageNumber === 1) {
            list[index].image1 = file;
        } else if (imageNumber === 2) {
            list[index].image2 = file;
        }
    
        const reader = new FileReader();
        reader.onload = (e) => {
            if (imageNumber === 1) {
                list[index].image1Base64 = e.target.result; // เก็บ Base64 string ใน stepList
            } else if (imageNumber === 2) {
                list[index].image2Base64 = e.target.result; // เก็บ Base64 string ใน stepList
            }
            setStepList(list);
        };
    
        reader.readAsDataURL(file);
    };
    

    const handleFoodChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleTitleChange = (e) => {
        setFormData({ ...formData, title: e.target.value });
    };

    const handleDetailsChange = (e) => {
        setFormData({ ...formData, details: e.target.value });
    };

    const removeStep = (index) => {
        const list = [...stepList];
        list.splice(index, 1);
        setStepList(list);
    };

    const stepChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...stepList];
        list[index][name] = value;
        setStepList(list);
    };

    const handleFormSubmit = async () => {
        console.log('abc', formData,stepList,selectedImage)
        const newStepList = stepList.map(({step, image1Base64, image2Base64}) => {
            return {
                step,
                "image1": image1Base64,
                "image2": image2Base64
            };
        });
        console.log(newStepList)
        try {
            const newRecipe = {
                title: formData.title,
                selectedImage,
                nation: formData.nation,
                type: formData.type,
                details: formData.details,
                steps: newStepList,
            };
            console.log(JSON.stringify(newRecipe ))
            const response = await fetch(`${NEXT_PUBLIC_BASE_API_URL}/api/recipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newRecipe)
            });
    
            if (response.ok) {
                // ส่งข้อมูลเรียบร้อย
                console.log('ส่งสูตรอาหารสำเร็จ');
                // รีเซ็ตฟิลด์แบบฟอร์มหรือเปลี่ยนเส้นทางไปหน้าสำเร็จ
            } else {
                console.error('การส่งสูตรอาหารล้มเหลว',response.statusText);
            }
        } catch (error) {
            console.error('ข้อผิดพลาด:', error);
        }
    };
    


    return (
        <>
            <Navbar />
            <div className="px-2 2xl:px-64 xl:px-10 md:px-40">
                <div className="text-5xl font-extrabold">
                    <h1 >เขียนสูตรอาหาร</h1>
                </div>
                <div className="mt-[48px] ">
                    <form action="">
                        <div className="mt-[48px]">
                            <h1 className="text-2xl font-bold mb-[24px]">รูปภาพอาหาร</h1>
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFoodChange}
                                    style={{ display: 'none' }}
                                    id="imageInput"
                                />
                                <label
                                    htmlFor="imageInput"
                                    className="border-2 border-black py-2 px-4 rounded cursor-pointer"
                                >
                                    เลือกรูปภาพ
                                </label>
                                <div>
                                    {selectedImage && (
                                        <img
                                            src={selectedImage}
                                            alt="รูปภาพ"
                                            className="mt-4 max-w-[600px]"
                                        />
                                    )}
                                </div>

                            </div>
                        </div>


                        <h1 className="text-2xl font-bold mt-[48px]">ชื่ออาหาร</h1>
                        <input
                            type="text"
                            id="title"
                            className="border-black border-4 p-2"
                            style={{ width: "500px", height: "40px" }}
                            value={formData.title}
                            onChange={handleTitleChange}
                        />


                        <label htmlFor="" className="text-2xl font-bold mt-[24px] ml-[24px]">ที่มา</label>
                        <select name="Nation" id="nationSelect" className="p-1 border-2 border-black ml-[8px]">
                            {nation.map((nationData, index) => (
                                <option key={index} value={nationData.code}>
                                    {nationData.name}
                                </option>
                            ))}
                        </select>

                        <label htmlFor="" className="text-2xl font-bold mt-[24px] ml-[24px]">ประเภท</label>
                        <select name="type" id="typeSelect" className="p-1 border-2 border-black ml-[8px]">
                            <option key="อาหารคาว" value="อาหารคาว">
                                อาหารคาว
                            </option>
                            <option key="อาหารหวาน" value="อาหารหวาน">
                                อาหารหวาน
                            </option>
                        </select>

                        <h1 className="text-2xl font-bold">รายละเอียด</h1>
                        <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            className="border-black border-4 p-2"
                            style={{ width: "500px", height: "200px" }}
                            value={formData.details}
                            onChange={handleDetailsChange}
                        ></textarea>
                    </form>
                </div>
                <form action="" className="mt-[48px]">
                    <label htmlFor="step" className="text-2xl font-bold">
                        ขั้นตอนการทำ
                    </label>

                    {stepList.map((eachStep, index) => (
                        <div key={index} className="steps mt-[24px]">
                            <div className="first-division my-2">
                                <input
                                    type="text"
                                    className="border-black border-4 p-2"
                                    id="step"
                                    required
                                    name="step"
                                    value={eachStep.step}
                                    onChange={(e) => stepChange(e, index)}
                                    style={{ width: "500px", height: "40px" }}
                                />

                                {/* อัพโหลดและแสดงรูปที่ 1 */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, index, 1)}
                                    style={{ display: "none" }}
                                    ref={(input) => (fileInputRefs1.current[index] = input)}
                                />
                                <button
                                    type="button"
                                    className="border-black border-2 p-2 ml-2"
                                    onClick={() => fileInputRefs1.current[index].click()}
                                >
                                    เลือกรูป 1
                                </button>

                                {/* อัพโหลดและแสดงรูปที่     2 */}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, index, 2)}
                                    style={{ display: "none" }}
                                    ref={(input) => (fileInputRefs2.current[index] = input)}
                                />
                                <button
                                    type="button"
                                    className="border-black border-2 p-2 ml-2"
                                    onClick={() => fileInputRefs2.current[index].click()}
                                >
                                    เลือกรูป 2
                                </button>

                                <div className="flex w-[700px] justify-between">
                                    {eachStep.image1 && (
                                        <img
                                            src={URL.createObjectURL(eachStep.image1)}
                                            alt={`Step ${index + 1} (Image 1)`}
                                            style={{ maxWidth: "300px", maxHeight: "300px", marginTop: "8px" }}
                                        />
                                    )}

                                    {eachStep.image2 && (
                                        <img
                                            src={URL.createObjectURL(eachStep.image2)}
                                            alt={`Step ${index + 1} (Image 2)`}
                                            style={{ maxWidth: "300px", maxHeight: "300px", marginTop: "8px" }}
                                        />
                                    )}
                                </div>


                                {stepList.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-btn py-[8px] px-[24px] mt-[24px] bg-red-700 text-white border-2 border-black rounded-xl"
                                        onClick={() => removeStep(index)}
                                    >
                                        ลบ
                                    </button>
                                )}
                            </div>

                            <div className="second-division mt-[48px]">
                                {stepList.length - 1 === index && (
                                    <button
                                        type="button"
                                        onClick={addStep}
                                        className="py-[8px] px-[48px] bg-red-700 text-white border-2 border-black rounded-xl"
                                    >
                                        เพิ่ม
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </form>
                <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="py-2 px-4 bg-red-700 text-white border-2 border-black rounded-md mt-4"
                >
                    ส่งข้อมูล
                </button>
            </div>
            <Footer />
        </>
    );
}
