import "./Home.scoped.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { baseApiUrl } from "../config";

const Home = () => {
  return (
    <div className="container">
      <NavBar />
      <main>
        <section id="promotions-box">
          <h1>PROMOTION</h1>
          <div className="promotion-box-scroll">
            <PromotionItems />
          </div>
        </section>
        <section id="new-box">
          <h1>NEW ARRIVALS</h1>
          <div className="new-box-scroll">
            <NewArrivals />
          </div>
        </section>
        <section id="rec-box">
          <h1>RANDOM FOOD</h1>
          <div className="rec-box-grid">
            <Random />
          </div>
        </section>
      </main>
    </div>
  );
};

const PromotionItems = () => {
  const [profood, setProFood] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProFood = async () => {
      try {
        const res = await axios.post(`${baseApiUrl}/pro`);
        setProFood(res.data);
      } catch (err) {
        alert(err);
      }
    };
    fetchProFood();
  }, []);

  useEffect(() => {
    // Auto change image
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === profood.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, profood.length]);

    // Go to previous image
    const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? profood.length - 1 : currentIndex - 1);
  };

    // Go to next image
    const goToNext = () => {
    setCurrentIndex(currentIndex === profood.length - 1 ? 0 : currentIndex + 1);
  };

  // If there are no promotion items, return null
  if (!profood.length) return null;

  return (
    <div className="promotion-carousel">
      <button onClick={goToPrevious} className="carousel-button prev-button">
        &#10094;
      </button>
      <img src={profood[currentIndex].URL} alt="" className="carousel-image" />
      <button onClick={goToNext} className="carousel-button next-button">
        &#10095;
      </button>
    </div>
  );
};


const NewArrivals = () => {
  const [food, setFood] = useState([]);
  useEffect(() => {
    axios
      .post(`${baseApiUrl}/new`)
      .then((res) => {
        setFood(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return food.map((item) => {
    return (
      <Link className="new-item" key={item.id} to={"/fooddetail/" + item.id}>
        <img src={item.URL} alt="" />
        <div className="new-item-name">{item.Food_Name}</div>
        <div className="new-item-price">{item.Price?.toFixed(2)} ฿</div>
      </Link>
    );
  });
};

const Random = () => {
  const [ranFood, setRanFood] = useState([]);

  useEffect(() => {
    axios
      .post(`${baseApiUrl}/food`)
      .then((res) => {
        const food = res.data;
        const randomFood = [];
        for (let i = 0; i < 6; i++) {
          var random = Math.floor(Math.random() * food.length);
          randomFood[i] = food[random];
          food.splice(random, 1);
        }
        setRanFood(randomFood);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  if (ranFood[0] == undefined) return;

  return ranFood.map((item) => {
    return (
      <Link className="rec-item" key={item?.id} to={"/fooddetail/" + item?.id}>
        <img src={item?.URL} alt="" />
        <div className="rec-item-name">{item?.Food_Name}</div>
        <div className="rec-item-price">{item?.Price.toFixed(2)} ฿</div>
      </Link>
    );
  });
};

export default Home;
