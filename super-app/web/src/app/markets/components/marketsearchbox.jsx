import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import "./style.css";

export default function MarketSearchBox() {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    }

    return (
        <main className="searchbox">
            <div className="cart_logo">
                <BsCart4 className="cart_logo_icon"/>
            </div>
            <div className="textbox_container">
                <input className="textbox_input"
                    type="text"
                    placeholder="Search for a market"
                    value={search}
                    onChange={handleSearch}
                />
            </div>
        </main>
    );
}