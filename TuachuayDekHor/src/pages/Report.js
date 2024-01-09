import React from 'react';
import "./Report.scoped.css";
import { Link } from "react-router-dom";
import Navbar from '../component/Nav';
const Report = () =>{
    return (
        <div className="report">
            <header>
                <Navbar></Navbar>
            </header>
            <div className="report">
                <h1 id='reporttitle'>Report</h1>
                <textarea id="textreport" cols=" " rows="10" placeholder='type your report here...'></textarea>
                <div className="reportfooter">
                    <button className='btn-report'><a href="reportfinish">send report</a></button>
                    <button id="btn-cancel" className='btn-report'><a href="home">cancel</a></button>
                </div>    
            </div>
        </div>
    );
};

export default Report;