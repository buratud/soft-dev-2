import "./Login.scoped.css";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function Register() {
  const lo = ["./img/logologin.png"];
  const [images, setimages] = useState([]);
  const [imagesurl, setimagesurl] = useState([]);
  const [username, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navi = useNavigate();
  const adduser = () => {
    axios.post("http://localhost:3001/creat_user", {
      user_name: username,
      email: email,
      password: password,
      profile: imagesurl,
    });
    navi("/login");
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newimagesurl = [];
    images.forEach((image) => newimagesurl.push(URL.createObjectURL(image)));
    setimagesurl(newimagesurl);
  }, [images]);

  useEffect(() => {
    setimagesurl(lo);
  }, []);

  console.log("image :", images);
  console.log("imageurl :", imagesurl);

  function onimage(e) {
    setimages([...e.target.files]);
    console.log("url :", ...e.target.files);
  }
  return (
    <div className="bg-[#A0855B] h-screen flex justify-center items-center bg">
      <div className="bg-white flex flex-row px-6 py-12 lg:px-20  justify-center   border-black border-solid my-12 lg:my-56  border-2 rounded-md">
        <Grid container spacing={12}>
          <Grid item xs={6}>
            <div className="w-96 pt-10">
              <label
                htmlFor="email"
                className="block text-lg font-medium leading-6 text-[#000000]"
              >
                Choseyourprofiles
              </label>
              {imagesurl.map((imageSrc) => (
                <img
                  className=" rounded-[50%] object-cover w-96 h-96"
                  src={imageSrc}
                />
              ))}
              <input
                type="file"
                accept="image/*"
                onChange={onimage}
                autoComplete="current-password"
                required
                className="p-3 block w-full rounded-md border-1 border-black py-1.5  text-[#000000] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up to your account
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-[#000000]"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={(event) => {
                        setname(event.target.value);
                      }}
                      required
                      className="p-3 block w-full rounded-md border-0 py-1.5 text-[#000000] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-[#000000]"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      autoComplete="email"
                      onChange={(event) => {
                        setemail(event.target.value);
                      }}
                      required
                      className="p-3 block w-full rounded-md border-0 py-1.5 text-[#000000] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-[#000000]"
                    >
                      Password
                    </label>
                    <div className="text-sm" />
                  </div>
                  <div className="mt-2">
                    <input
                      type="password"
                      autoComplete="current-password"
                      onChange={(event) => {
                        setpassword(event.target.value);
                      }}
                      required
                      className="p-3 block w-full rounded-md border-1 border-black py-1.5  text-[#000000] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-[#000000]"
                    >
                      Confirmpassword
                    </label>
                    <div className="text-sm" />
                  </div>
                  <div className="mt-2">
                    <input
                      type="password"
                      autoComplete="current-password"
                      required
                      className="p-3 block w-full rounded-md border-1 border-black py-1.5  text-[#000000] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={adduser}
                    className="flex w-full justify-center rounded-md bg-[#A0855B] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#ddb97f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-back"
                  >
                    Sign up
                  </button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-gray-500">
                alredy have a member?{" "}
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-[#7C913D] hover:text-[#def59a]"
                >
                  login
                </Link>
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default Register;
