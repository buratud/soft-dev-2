import "../App.scoped.css";
import Bt1 from "../components/bt1";
import Card from "../components/card";
import Navbar from "../components/nav";
import Filter from "../components/filter";
import Bt2 from "../components/bt2";
import axios from "axios";
import Choice from "../components/choice";
import { useContext, useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router";
import Help from "../components/help";
import Footer from "../components/footer";
import { Link, useSearchParams } from "react-router-dom";
import { Slider, TextField } from "@mui/material";
import { userContext } from "../App";

function Main() {
  const [dormlist, setdormlist] = useState([]);
  const [searchFilter, setsearchFilter] = useState("");
  const [dormCard, setDormCard] = useState("");
  const [searchClick, setSearchClick] = useState(0);
  const [filter, setFilter] = useState({
    minPrice:0,
    maxPrice:10000,
    minDistance:0,
    maxDistance:10000
  });

  const navi = useNavigate();
  const location = useLocation();
  const { user,setUser } = useContext(userContext)

  useEffect(() => {
    const url = "http://localhost:3001/";
    axios
      .get(url)
      .then((response) => {
        setdormlist(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  // dorm card
  useEffect(() => {
    setDormCard(
      dormlist
        .filter((dorm) => {
          return dorm.dorm_name.includes(searchFilter);
        })
        .map((dorm, index) => {
          return (
            <Link key={index} to={`/${(user.actor === "user" || user.actor === null)?"detail":"manage"}/${dorm.dorm_id}`}>
              <Card dorm={dorm}></Card>
            </Link>
          );
        })
    );
   
  }, [location, dormlist, searchClick]);

  const ClickFilter = () => {
    const searchParams = new URLSearchParams(filter);
    axios.get("http://localhost:3001/filter/?"+searchParams.toString())
    .then((response) => {
      setdormlist(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }


  const handleChangePrice = (event, newValue) => {
    setFilter({
      maxDistance:filter.maxDistance,
      minDistance:filter.minDistance,
      minPrice:newValue[0],
      maxPrice:newValue[1]
    })
  };
  const handleChangeDistance = (event, newValue) => {
    setFilter({
      maxPrice:filter.maxPrice,
      minPrice:filter.minPrice,
      minDistance:newValue[0],
      maxDistance:newValue[1]
    })
  };

  const editFilter = (event) => {
    const {name,value} = event.target;
    setFilter((prevfilter) => {
        return {
            ...prevfilter,
            [name] : value
        }
    })
}

  return (
    <div className="Main">
      <Navbar />
      <img src="/img/banner (1).svg" className="banner mb-4" />
      <div className="container">
        <div className="search">
          <input
            className="mr-2"
            type="text"
            value={searchFilter}
            onChange={(event) => setsearchFilter(event.target.value)}
            placeholder="dorm name...."
          />
          <div
            onClick={() => {
              setSearchClick(searchClick + 1);
            }}
          >
            <Bt1>search</Bt1>
          </div>
        </div>
        <div className="content">
          <div className="filter">

            {/* price */}
            <Filter section="price">
              <div className="mt-2 mx-2 flex items-center  justify-between">
              <TextField
                name="minPrice"
                label="min"
                value={filter.minPrice} 
                className="w-[4.5rem]" 
                size="small"
                onChange={editFilter}
              />
                -
              <TextField
                name="maxPrice"
                label="max"
                value={filter.maxPrice} 
                className="w-[4.5rem]" 
                size="small"
                onChange={editFilter}
              />
              </div>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={[filter.minPrice,filter.maxPrice]}
                onChange={handleChangePrice}
                step={500}
                min={0}
                max={10000}
              />
              <div></div>

            </Filter>

            {/* distance */}
            <Filter section="ระยะทาง(ม.)">
            <div className="mt-2 mx-2 flex items-center  justify-between">
              <TextField
                name="minDistance"
                label="min"
                value={filter.minDistance} 
                className="w-[4.5rem]" 
                size="small"
                onChange={editFilter}
              />
                -
              <TextField
                name="maxDistance"
                label="max"
                value={filter.maxDistance} 
                className=" w-[4.5rem]" 
                size="small"
                onChange={editFilter}
              />
              </div>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={[filter.minDistance,filter.maxDistance]}
                onChange={handleChangeDistance}
                step={100}
                min={0}
                max={10000}
              />
              <div></div>
            </Filter>
            <button className="btn-filter" onClick={ClickFilter}>
              <img
                src="/img/search.png"
                style={{ width: "30px", marginRight: "5px" }}
              />
              Filter
              <img
                src="/img/search.png"
                style={{ width: "30px", opacity: "0" }}
              />
            </button>
          </div>
          <div className="grid w-full ml-2">{dormCard}</div>
        </div>
      </div>
      <Help></Help>
      <Footer></Footer>
    </div>
  );
}
export default Main;
