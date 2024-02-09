import React, { useContext, useState, useEffect } from "react";
import "./AddProduct.scoped.css";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext, useSupabase } from "../App";
import { baseApiUrl } from "../config";

const AddProduct = () => {
  const { foodid } = useParams();
  const [file, setFile] = useState("");
  const [food, setFood] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const supabase = useSupabase();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleAddProduct = (event) => {
    event.preventDefault();
    const cata = event.target[3].value;
    if (foodid === undefined) {
      axios
        .post(`${baseApiUrl}/addproduct`, {
          name: event.target[1].value,
          price: event.target[2].value,
          catagory_id: cata,
          id: user.id,
          description: event.target[5].value,
          picture: file,
          line: event.target[4].value,
        })
        .then((res) => {
          alert("Add food success.");
          navigate("/manage");
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      axios
        .post(`${baseApiUrl}/manageproduct`, {
          name: event.target[1].value,
          price: event.target[2].value,
          catagory_id: cata,
          id: user.id,
          description: event.target[5].value,
          picture: file,
          line: event.target[4].value,
          food: foodid,
        })
        .then((res) => {
          alert("Manage food success.");
          navigate("/manage");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const upload_File = async (event) => {
    // console.log(event.target.files[0]);
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
      const { data } = supabase.storage
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

  if (foodid !== undefined)
    useEffect(() => {
      axios
        .post(`${baseApiUrl}/fooddetail`, {
          foodid: foodid,
        })
        .then(({ data }) => {
          setFood(data[0]);
          setFile(data[0].URL);
          console.log(file);
        })
        .catch((err) => {
          alert(err);
        });
    }, []);

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
            <input type="text" defaultValue={food?.Food_Name ?? ""} />
            <label htmlFor="productprice">Price</label>
            <input type="text" defaultValue={food?.Price ?? ""} />
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              select
              property="status"
              value={food?.Catagory_Id ?? "1"}
              onChange={changeCatagory}
              styleClass="form-control"
            >
              <option value="1">Thai-Food</option>
              <option value="2">Japan-Food</option>
              <option value="3">Korean-Food</option>
              <option value="4">Italian-Food</option>
              <option value="5">Drinks</option>
              <option value="6">Sweets and Desserts</option>
            </select>
            <label htmlFor="line">Line</label>
            <input type="text" defaultValue={food?.Line ?? ""} />
          </div>
        </div>
        <div className="description">
          <textarea
            name="description"
            placeholder="Enter your description here..."
            className="center-textarea"
            cols="100"
            rows="7"
            defaultValue={food?.Description ?? ""}
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
