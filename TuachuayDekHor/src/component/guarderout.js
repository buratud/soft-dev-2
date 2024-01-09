import {Outlet,Navigate} from "react-router-dom";
import {useContext} from "react";
import {General} from "../App";

const guarderout = () => {
    const{session, isFetching} =useContext(General);
    if(session|| isFetching) return <Outlet/>;
    else return <Navigate to = "/login" />;
};
export default guarderout;