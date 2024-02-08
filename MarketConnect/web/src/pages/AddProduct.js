import React, { useContext, useState, useEffect } from "react";
import "./AddProduct.scoped.css";
import NavBar from "../components/NavBar";
import { PopChat } from "../components/PopChat";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext, useSupabase } from "../App";
import { baseApiUrl } from "../config";

const AddProduct = () => {
  const { foodid } = useParams();
  const [file, setFile] = useState("");
  const [food, setFood] = useState({
    Food_Name: "",
    Price: "",
    Catagory_Id: "",
    Description: "",
    Line: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const supabase = useSupabase();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleAddProduct = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("picture", file); // Append file to form data
    const cata = formData.get("category");
    const requestData = Object.fromEntries(formData);
    requestData.id = user.id;

    const url =
      foodid === undefined
        ? `${baseApiUrl}/addproduct`
        : `${baseApiUrl}/manageproduct`;
    axios
      .post(url, requestData)
      .then((res) => {
        alert(
          foodid === undefined ? "Add food success." : "Manage food success."
        );
        navigate("/manage");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const upload_File = async (event) => {
    if (event.target.files[0] !== undefined) {
      setIsUploading(true);
      const filename = Math.random()
        .toString(36)
        .slice(2);
      const { error } = await supabase.storage
        .from("Picture_Food")
        .upload(filename + ".png", event.target.files[0], {
          contentType: "image/png",
          upsert: true,
        });
      if (error) {
        setIsUploading(false);
        return alert(error);
      }
      const { data } = await supabase.storage
        .from("Picture_Food")
        .getPublicUrl(filename + ".png");
      setFile(data.publicUrl);
      setIsUploading(false);
  
      // Display image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById("image-preview").src = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    } document.getElementById("image-preview").src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png?20200912122019";
  };  

  useEffect(() => {
    if (foodid !== undefined) {
      axios
        .post(`${baseApiUrl}/fooddetail`, { foodid })
        .then(({ data }) => {
          setFood(data[0]);
          setFile(data[0].URL);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [foodid]);

  const changeCatagory = (e) => {
    setFood({ ...food, Catagory_Id: e.target.value });
  };

  return (
    <div onSubmit={handleAddProduct} className="container">
      <NavBar />
      <h1>Add/Edit your product</h1>
      <form>
        <div className="box">
          <div className="form-box-left">
            {/*image uploader*/}
            <input onChange={upload_File} type="file" />
            <img
              id="image-preview"
              src=""
              alt="Preview"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
          <div className="form-box-right">
            <label htmlFor="productname">Food Name</label>
            <input
              type="text"
              name="name"
              value={food.Food_Name}
              onChange={(e) => setFood({ ...food, Food_Name: e.target.value })}
            />
            <label htmlFor="productprice">Price</label>
            <input
              type="text"
              name="price"
              value={food.Price}
              onChange={(e) => setFood({ ...food, Price: e.target.value })}
            />
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={food.Catagory_Id}
              onChange={changeCatagory}
            >
              <option value="1">Thai-Food</option>
              <option value="2">Japan-Food</option>
              <option value="3">Korean-Food</option>
              <option value="4">Italian-Food</option>
              <option value="5">Drinks</option>
              <option value="6">Sweets and Desserts</option>
            </select>
            <label htmlFor="line">Line</label>
            <input
              type="text"
              name="line"
              value={food.Line}
              onChange={(e) => setFood({ ...food, Line: e.target.value })}
            />
          </div>
        </div>
        <div className="description">
          <textarea
            name="description"
            placeholder="Enter your description here..."
            className="center-textarea"
            cols="100"
            rows="7"
            value={food.Description}
            onChange={(e) => setFood({ ...food, Description: e.target.value })}
          />
        </div>
        <div className="send-button">
          <button disabled={isUploading} type="submit" className="send-button">
            Done
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
