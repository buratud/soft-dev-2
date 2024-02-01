'use client'

// Please create /markets/page.js and import "Searchbox" as MarketSearchBox
import MarketSearchBox from "./components/marketsearchbox";

export default function Markets() {
  return (
    <main>
      <MarketSearchBox /> {/*This is a Searchbox component */}
    </main>
  );
}
