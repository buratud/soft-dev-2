import React, { useState } from "react";
import "./style.css";

export default function MarketSearchBox() {
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
        console.log(e.target.value);
    }

    return (
        <main className="searchbox">
            <input
                className="searchbox_input"
                type="text"
                placeholder="Search for a market"
                value={search}
                onChange={handleSearch}
            />
        </main>
    );
}