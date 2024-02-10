import { useEffect, useState } from "react";
import axios from "axios";

const GetTable = () => {
  return (
    <div>
      <DataShow />
    </div>
  );
};

const DataShow = () => {
  var [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3200").then((res) => {
      console.log(res);
      setData(res);
    });
  }, []);

  var containers = [];
  for (var el of data.values()) {
    containers.push(
      <div>
        {el.ID_User}
        <br />
        {el.Username}
        <br />
        {el.Password}
        <br />
        {el.Contract_Number}
        <br />
        {el.Email}
        <br />
        {el.Seller}
        <br />
        {el.Admin}
      </div>
    );
  }

  return containers;
};

export default GetTable;
