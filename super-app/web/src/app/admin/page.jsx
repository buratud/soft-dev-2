'use client'
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_BASE_WEB_PATH } from '../../../config';
import styles from "./Admin.module.css";
import NavBar from "../../../components/nav";
import Footer from "../../../components/footer/Footer";
import { General, supabase } from '../../../session';
import { useRouter } from "next/navigation";


function Admin() {
    const [issues, setIssues] = useState([]);
    const [selectedType, setSelectedType] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [adminAuthValue, setAdminAuthValue] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const router = useRouter();

    const handleChange_Type = (event) => {
        setSelectedType(event.target.value); // เมื่อเลือก option ใหม่และเปลี่ยนค่า Type ที่ต้องการค้นหา
    };

    const handleChange_Status = (event) => {
        setSelectedStatus(event.target.value); // เมื่อเลือก option ใหม่และเปลี่ยนค่า Status ที่ต้อง
    };

    useLayoutEffect(() => {
        const timeoutId = setTimeout(() => {
            setAdminAuthValue(false);
        }, 100);
        const isAdmin = async() => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.log(error);
                clearTimeout(timeoutId);
            }
            const user = data?.session?.user;
            if (user) {
                axios.post(`${NEXT_PUBLIC_BASE_API_URL}/profile-picture`,
                    {
                        userID: user.id
                    }).then( (res) => {
                        const { role } = res.data.data;
                        if (role == 'Admin') {
                            clearTimeout(timeoutId);
                            setAdminAuthValue(true);
                        }
                        else{
                            clearTimeout(timeoutId);
                            router.push('/');

                        }
                    }).finally(() => {
                        setAuthChecked(true);
                    });;
            }else{
                clearTimeout(timeoutId);
                setAuthChecked(true);
                router.push('/');
                
            }
        }

        isAdmin();
    }, [])

    useEffect(() => {
        if (!adminAuthValue && authChecked) {
            alert("You don't have permission");
        }
    }, [adminAuthValue, authChecked]);

    const getdata = async () => {
        try {
            const res = await axios.post(`${NEXT_PUBLIC_BASE_API_URL}/adminsupport`);
            setIssues(res.data);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const filteredIssues = issues.filter(issue => {

        if (selectedType !== 'All' && issue.type !== selectedType) {
            return false; // ถ้าเลือก Type แล้วไม่ตรงกับ issue ที่กำลัง loop อยู่
        }
        if (selectedStatus !== 'All' && issue.status !== selectedStatus) {
            return false; // ถ้าเลือก Status แล้วไม่ตรงกับ issue ที่กำลัง loop อยู่
        }
        return true // ถ้าไม่เข้าเงื่อนไขข้างต้น แสดงว่า issue นี้ถูกต้องตามเงื่อนไขที่เลือก
    });

    const filteredIssueElements = filteredIssues.map((issue) => (
        <tr key={issue?.index}>
            <td className={styles.left}>{issue?.Id}</td>
            <td className={styles.middle}>{issue?.email}</td>
            <td className={styles.middle}>{issue?.type}</td>
            <td className={styles.middle}>{issue?.problem}</td>
            <td className={styles.middle}>
                <select
                    value={issue?.status}
                    onChange={(e) =>
                        handleStatusChange(e, issue?.id, e.target.value)
                    }>
                    <option value="Sent">Sent</option>
                    <option value="Unsent">Unsent</option>
                </select>
            </td>
            <td className={styles.right}>
                {issue?.status === 'Unsent' ? (
                    <Image alt="dekhor1" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/XCircleFill.svg`} height={24} width={24} />
                ) : (
                    <Image alt="dekhor1" src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/CheckCircleFill.svg`} height={24} width={24} />
                )}
            </td>
        </tr>
    ));
    return !adminAuthValue? (
        <body></body>
    ) : (
        <div className={styles.main}>
            <NavBar />
            <div className={styles.adminContainer}>
                <h2>Admin Dashboard</h2>
                <div className={styles.selected_Wrap}>
                    <div className={styles.selected_Type}>
                        <h1>Type : </h1>
                        <select className={styles.dropdown} value={selectedType} onChange={handleChange_Type}>
                            <option value="All">All</option>
                            <option value="Blogs">Blogs</option>
                            <option value="Dorms">Dorms</option>
                            <option value="Markets">Markets</option>
                        </select>
                    </div>
                    <div className={styles.selected_Status}>
                        <h1>Status : </h1>
                        <select className={styles.dropdown} value={selectedStatus} onChange={handleChange_Status}>
                            <option value="All">All</option>
                            <option value="Finish">Finish</option>
                            <option value="Not finish">Not finish</option>
                        </select>
                    </div>
                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.leftTop}>ID</th>
                            <th style={{ borderRight: "2px solid #BBB6B6;" }}>Email</th>
                            <th style={{ borderRight: "2px solid #BBB6B6;" }}>Type</th>
                            <th style={{ borderRight: "2px solid #BBB6B6;" }}>Problem</th>
                            <th style={{ borderRight: "2px solid #BBB6B6;" }}>Status</th>
                            <th className={styles.rightTop}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIssueElements}
                    </tbody>
                </table>

            </div>
            <Footer />
        </div>
    );

}

export default Admin;