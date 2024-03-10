import "./Home.scoped.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { REACT_APP_BASE_API_URL } from "../config";
import { IoReloadOutline } from "react-icons/io5";

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
          <NewArrivals />
        </section>
        <section id="rec-box">
          <Random />
        </section>
      </main>
      <Footer />
    </div>
  );
};

const PromotionItems = () => {
  const [profood, setProFood] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProFood = async () => {
      try {
        // Using async/await syntax for the request
        const response = await axios.post(`${REACT_APP_BASE_API_URL}/pro`);
        setProFood(response.data);
      } catch (err) {
        // Catching and handling any error that occurs during the fetch operation
        alert(err);
      }
    };
    fetchProFood();
  }, []); // Empty dependency array means this effect runs only once after the initial render


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
      .post(`${REACT_APP_BASE_API_URL}/new`)
      .then((res) => {
        console.log('Response data:', res.data);
        setFood(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  return (
    <div className="new-arrivals-container">
      {food.map((item) => (
        <Link className="new-arrival-card" key={item.id} to={"/fooddetail/" + item.id}>
          <div className="card-image-container">
            <img src={item.URL} alt={item.Food_Name} />
          </div>
          <div className="card-content">
            <div className="card-title">{item.Food_Name}</div>
            <div className="card-price">{Number(item.Price).toLocaleString('en-US')} ฿</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

const Random = () => {
  const [ranFood, setRanFood] = useState([]);

  // Function to fetch random food items
  const fetchRandomFood = async () => {
    try {
      const res = await axios.post(`${REACT_APP_BASE_API_URL}/food`);
      const food = res.data;
      const randomFood = [];
      for (let i = 0; i < 8; i++) {
        var randomIndex = Math.floor(Math.random() * food.length);
        randomFood.push(food[randomIndex]);
        food.splice(randomIndex, 1);
      }
      setRanFood(randomFood);
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching food items');
    }
  };

  useEffect(() => {
    fetchRandomFood();
  }, []);

  if (!ranFood.length) return null;

  return (
    <>
      <div className="title-with-button">
        <h1>RANDOM FOOD</h1>
        <IoReloadOutline onClick={fetchRandomFood} className="refresh-button" />
      </div>
      <div className="rec-box-grid">
        {ranFood.map((item, index) => {
          if (item) {
            return (<Link className="rec-item" key={index} to={`/fooddetail/${item.id}`}>
              <img src={item.URL} alt={item.Food_Name || 'Food item'} />
              <div className="rec-item-name">{item.Food_Name}</div>
              <div className="rec-item-price">{Number(item.Price).toLocaleString('en-US')} ฿</div>
            </Link>)
          }
        })}
      </div>
    </>
  );
};

export default Home;
