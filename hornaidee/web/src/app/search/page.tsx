'use client'
import dynamic from "next/dynamic";
const DormsSearchMaps = dynamic(() => import("../../../components/DormsSearchMaps/DormsSearchMaps"), { ssr: false });
import './styles.scoped.scss'
export default function Page() {
  return (
    <div className="container">
      <div>
        <DormsSearchMaps />
      </div>
      <div className="result-box">XD</div>
    </div>
  );
}