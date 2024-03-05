'use client'
import dynamic from "next/dynamic";
const SinglePointMaps = dynamic(() => import("../../../components/SinglePointMaps/SinglePointMaps.tsx"), { ssr: false });

export default function Page() {
  return (
    <SinglePointMaps width="100%" height="calc(100vh - 80px)" />
  );
}