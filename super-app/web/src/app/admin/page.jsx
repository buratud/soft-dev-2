'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Admin.module.css";
import NavBar from "../../../components/nav";

function Admin() {
    const [issues, setIssues] = useState([]);
    const [selectedType, setSelectedType] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('none');

    const handleChange_Type = (event) => {
        setSelectedType(event.target.value); // เมื่อเลือก option ใหม่และเปลี่ยนค่า Type ที่ต้องการค้นหา
    };

    const handleChange_Status = (event) => {
        setSelectedStatus(event.target.value); // เมื่อเลือก option ใหม่และเปลี่ยนค่า Status ที่ต้อง
    };



    const getdata = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/adminsupport`);
            setIssues(res.data);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const handleStatusChange = async (event, id, newStatus) => {
        event.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BASE_API_URL}/changestatus`, {
                status: newStatus,
                id: id,
            });
            getdata();
        } catch (error) {
            alert(error);
        }
    };

    const filteredIssues = issues.filter(issue => {
        
        if (selectedType !== 'All' && issue.Type !== selectedType) {
            return false; // ถ้าเลือก Type แล้วไม่ตรงกับ issue ที่กำลัง loop อยู่
        }
        if (selectedStatus !== 'All' && issue.Status !== selectedStatus) {
            return false; // ถ้าเลือก Status แล้วไม่ตรงกับ issue ที่กำลัง loop อยู่
        }
        return true // ถ้าไม่เข้าเงื่อนไขข้างต้น แสดงว่า issue นี้ถูกต้องตามเงื่อนไขที่เลือก
    });
    
    const filteredIssueElements = filteredIssues.map((issue) => (
        <tr key={issue?.id}>
            <td>{issue?.id}</td>
            <td>{issue?.Sender}</td>
            <td>{issue?.Type}</td>
            <td>{issue?.Problem}</td>
            <td>
                <select
                    value={issue?.Status}
                    onChange={(e) =>
                        handleStatusChange(e, issue?.id, e.target.value)
                    }>
                    <option value="Finish">Finish</option>
                    <option value="In Progress">Not finish</option>
                </select>
            </td>
        </tr>
    ));
    
    return (
        <div className={styles.adminContainer}>
            <NavBar />
            <h2>Admin Dashboard</h2>
            <div className={styles.selected_Wrap}>
                <div className={styles.selected_Type}>
                    <h1>Type : </h1>
                    <select className={styles.dropdown} value={selectedType} onChange={handleChange_Type}>
                        <option value="All Type">All</option>
                        <option value="blogs">Blogs</option>
                        <option value="dorms">Dorms</option>
                        <option value="markets">Markets</option>
                    </select>
                </div>
                <div className={styles.selected_Status}>
                    <h1>Status : </h1>
                    <select className={styles.dropdown} value={selectedStatus} onChange={handleChange_Status}>
                        <option value="All Status">All</option>
                        <option value="Finish">Finish</option>
                        <option value="Not finish">Not finish</option>
                    </select>
                </div>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th>Problem</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredIssueElements}
                </tbody>
            </table>
        </div>
    );
    
}

export default Admin;