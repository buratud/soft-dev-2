'use client'
import NoSsr from "../../../components/NoSsr";
import SinglePointMaps from "../../../components/SinglePointMaps/SinglePointMaps";

export default function Page() {
  return (
    <NoSsr>
      <SinglePointMaps width="100%" height="calc(100vh - 80px)" />
    </NoSsr>
  );
}