"use client"
import { AiOutlineHome, AiOutlineTag, AiOutlineEnvironment } from "react-icons/ai";
import { BsBuildings, Bs123, BsHouse } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { NEXT_PUBLIC_BASE_WEB_URL, NEXT_PUBLIC_BASE_API_URL, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_BASE_WEB_PATH } from "../../../../config";
import { createClient } from "@supabase/supabase-js";
import ImageUploadComponent from "../../image_component";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import "./style.css";
import SinglePointMaps from "../../../../components/SinglePointMaps/SinglePointMaps";
import NoSsr from "../../../../components/NoSsr";
const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function EditDormPage() {
  const router = useRouter();
  const params = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [property_number, setPropertyNumber] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [rent_price, setRentPrice] = useState(0);
  const [facilities, setFacilities] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [session, setSession] = useState(null);
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [imageErrors, setImageErrors] = useState(null);
  const [user_id, setUser_id] = useState("");
  const [owner_id, setOwner_id] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [inputStates, setInputStates] = useState({
    name: false,
    address: false,
    property_number: false,
    city: false,
    province: false,
    zip_code: false,
    rent_price: false,
  });

  useEffect(() => {
    const hasError = Object.values(errors).some((error) => !!error);
    if (hasError) {
      // Enable glow effect for fields with errors
      setInputStates((prevInputStates) => {
        const updatedStates = { ...prevInputStates };
        for (const key in errors) {
          updatedStates[key] = !!errors[key];
        }
        return updatedStates;
      });

      // Set a timer to remove the glow effect after 1 second
      const timer = setTimeout(() => {
        setInputStates({});
      }, 1000);

      // Cleanup function to clear the timer
      return () => clearTimeout(timer);
    } else {
      // Reset inputStates when there are no errors
      setInputStates({
        name: false,
        address: false,
        property_number: false,
        city: false,
        province: false,
        zip_code: false,
        rent_price: false,
      });
    }
  }, [errors]);

  useEffect(() => {
    // Get session
    supabase.auth
      .getSession()
      .then((result) => {
        if (result.data) {
          setSession(result.data.session);
          setUser_id(result.data.session.user.id);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // Check if user is the owner of the dorm
    axios.get(`${NEXT_PUBLIC_BASE_API_URL}/dorms/${params.id}`).then((res) => {
      setOwner_id(res.data.owner);
    });
  }, []);

  useEffect(() => {
    // if user is not the owner, redirect to the detail page
    if (user_id !== owner_id && !isLoading) {
      router.push(`${NEXT_PUBLIC_BASE_WEB_URL}/detail/${params.id}`);
    }
  }, [user_id, owner_id, isLoading]);

  async function imageUrlToBase64(url) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  }

  useEffect(() => {
    if (session) {
      axios.get(`${NEXT_PUBLIC_BASE_API_URL}/dorms/${params.id}`).then((res) => {
        // console.log(res.data);
        setName(res.data.name);
        setAddress(res.data.address);
        setPropertyNumber(res.data.property_number);
        setCity(res.data.city);
        setProvince(res.data.province);
        setZipCode(res.data.zip_code);
        setRentPrice(res.data.rent_price);
        setLatitude(res.data.latitude);
        setLongitude(res.data.longitude);
        const facilityIds = res.data.facilities.map(facility => facility.id);
        setFacilities(facilityIds);

        // Convert image URLs to base64
        const convertPhotosToBase64 = async () => {
          const base64Photos = await Promise.all(res.data.photos.map(async (photo) => {
            const base64 = await imageUrlToBase64(photo);
            return base64;
          }));
          setPhotos(base64Photos);
        };

        convertPhotosToBase64();
        setIsLoading(false);
      });
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Image
          alt="logo"
          src={`${NEXT_PUBLIC_BASE_WEB_PATH}/images/logo.png`}
          height={70}
          width={80}
          className="loading-image spinning"
        />
      </div>
    );
  }

  // Fetch ImageUploadComponent from photos
  const handleUpdatePhotos = (updatedPhotos) => {
    // Update the dorm data with the new photos
    setPhotos(updatedPhotos);
  };


  const toggleFacility = (facility) => {
    if (facilities.includes(facility)) {
      // Facility already selected, remove it
      setFacilities(facilities.filter((f) => f !== facility));
    } else {
      // Facility not selected, add it
      setFacilities([...facilities, facility]);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!address.trim()) {
      errors.address = "Address is required";
    }

    if (!property_number.trim()) {
      errors.property_number = "Property number is required";
    }

    if (!city.trim()) {
      errors.city = "City is required";
    }

    if (!province.trim()) {
      errors.province = "Province is required";
    }

    if (
      !zip_code.trim() ||
      zip_code.trim().length !== 5 ||
      isNaN(zip_code.trim())
    ) {
      errors.zip_code = "Zip code must be 5 digits";
    }

    if (rent_price === "" || rent_price < 0) {
      if (rent_price === "") {
        errors.rent_price = "Rent price is required";
      } else {
        errors.rent_price = "Rent price must be a non-negative number";
      }
    }

    if (facilities.length === 0) {
      errors.facilities = "Select at least one facility";
    }

    if (photos.length === 0) {
      errors.photos = "Upload at least one photo";
    }

    return errors;
  };

  const onLocationChange = (latitude, longtitude) => {
    setLatitude(latitude);
    setLongitude(longtitude);
    console.log(latitude, longtitude)
  };

  const submitForm = () => {
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      axios
        .put(
          `${NEXT_PUBLIC_BASE_API_URL}/dorms/${params.id}`,
          {
            owner: session.user.id,
            name: name,
            address: address,
            property_number: property_number,
            city: city,
            province: province,
            zip_code: zip_code,
            rent_price: parseFloat(rent_price),
            facilities: facilities,
            photos: photos,
            latitude: latitude,
            longitude: longitude,
          },
          { headers: { Authorization: `Bearer ${session.access_token}` } }
        )
        .then((res) => {
          setIsFormSubmitted(true);
          window.location.href = `${NEXT_PUBLIC_BASE_WEB_URL}/detail/${params.id}`;
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      setErrors(errors);
    }
  };


  return (
    <main className="flex flex-col items-center justify-center bg-[#F6F6FB]">
      <div className="flex flex-col justify-center items-center w-full md:w-3/4 lg:w-full gap-4" style={{ marginTop: '30px' }}>
        <form className="flex flex-col md:flex-row gap-36 font-Poppins flex-grow">
          <div className="flex flex-col w-full self-end">
            <div className="text-[#092F88] font-bold text-4xl font-Poppins mb-4">
              Edit Property
            </div>
            <div>Tell us your property name.</div>
            <div
              className={`flex items-center py-2 my-3 pr-2 rounded-2xl select-none bg-[#D9D9D9] ${inputStates.name ? "glow" : ""
                }`}
            >
              <BsBuildings className="input-icon ml-4 mr-1" />
              <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className={`input-field ml-1 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium ${errors.name ? "border-red-500" : ""
                  }`}
              />
            </div>

            <div className="pt-10 pb-2">
              Where is the property you are listing?
            </div>
            <div
              className={`flex items-center py-2 my-3 pr-2 rounded-2xl select-none bg-[#D9D9D9] ${inputStates.property_number ? "glow" : ""
                }`}
            >
              <BsHouse className="input-icon ml-4 mr-1" />
              <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
              <input
                type="text"
                value={property_number}
                onChange={(e) => setPropertyNumber(e.target.value)}
                placeholder="Property Number"
                className={`input-field ml-1 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium ${errors.property_number ? "border-red-500" : ""
                  }`}
              />
            </div>

            <div
              className={`flex items-center py-2 my-3 pr-2 rounded-2xl select-none bg-[#D9D9D9] ${inputStates.address ? "glow" : ""
                }`}
            >
              <AiOutlineHome className="input-icon ml-4 mr-1" />
              <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street Address"
                className={`input-field ml-1 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium ${errors.address ? "border-red-500" : ""
                  }`}
              />
            </div>

            <div
              className={`flex items-center py-2 my-3 pr-2 rounded-2xl select-none bg-[#D9D9D9] ${inputStates.city ? "glow" : ""
                }`}
            >
              <AiOutlineEnvironment className="input-icon ml-4 mr-1" />
              <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className={`input-field ml-1 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium ${errors.city ? "border-red-500" : ""
                  }`}
              />
            </div>

            <div
              className={`flex items-center py-2 my-3 pr-2 rounded-2xl select-none bg-[#D9D9D9] ${inputStates.province ? "glow" : ""
                }`}
            >
              <AiOutlineEnvironment className="input-icon ml-4 mr-1" />
              <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Province"
                className={`input-field ml-1 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium ${errors.province ? "border-red-500" : ""
                  }`}
              />
            </div>

            <div
              className={`flex items-center py-2 my-3 pr-2 rounded-2xl select-none bg-[#D9D9D9] ${inputStates.zip_code ? "glow" : ""
                }`}
            >
              <Bs123 className="input-icon ml-4 mr-1" />
              <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
              <input
                type="text"
                value={zip_code}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Zip Code"
                className={`input-field ml-1 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium ${errors.zip_code ? "border-red-500" : ""
                  }`}
              />
            </div>
          </div>

          <div className="w-full self-end">
            <div className="pb-1">Add some pictures of your property.</div>
            <ImageUploadComponent photos={photos} setPhotos={setPhotos} setImageErrors={setImageErrors} />
            <div className="pt-2">
              What facilities and filters do your property provide?
            </div>
            <div className="flex flex-row gap-4 my-2">
              <div className="flex flex-col gap-4 py-2 my-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(3)}
                    checked={facilities.includes(3)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Air-Conditioner
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(6)}
                    checked={facilities.includes(6)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Elevator
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(7)}
                    checked={facilities.includes(7)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Near Bus Stop
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(9)}
                    checked={facilities.includes(9)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Near Restaurants
                </label>
              </div>

              <div className="flex flex-col gap-4 py-2 my-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(5)}
                    checked={facilities.includes(5)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Free WiFi
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(4)}
                    checked={facilities.includes(4)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Pet-friendly
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onChange={() => toggleFacility(8)}
                    checked={facilities.includes(8)}
                    className="form-checkbox h-6 w-6 accent-bg-[#092F88] rounded cursor-pointer bg-[#8D8D8D]"
                  />
                  Near Shopping Malls
                </label>
              </div>
            </div>

            <div>
              <div>How much do you want to charge per month?</div>
              <div
                className={`flex items-center py-2 my-3 pr-2 rounded-2xl select-none bg-[#D9D9D9]  ${inputStates.rent_price ? "glow" : ""
                  }`}
              >
                <AiOutlineTag className="input-icon ml-4 mr-1" />
                <div className="h-5 bg-[#000000] w-[2px] bg-opacity-10 rounded-full mx-1"></div>
                <input
                  type="number"
                  value={rent_price}
                  onChange={(e) => setRentPrice(e.target.value)}
                  placeholder="Price per month (in THB)"
                  className={`input-field ml-2 flex-grow border-none bg-[#D9D9D9] focus:outline-none font-medium ${errors.rent_price ? "border-red-500" : ""
                    }`}
                />
              </div>
            </div>
          </div>
        </form>
        <NoSsr>
          <SinglePointMaps lat={latitude} long={longitude} width="1400px" onLocationChange={onLocationChange} changeable />
        </NoSsr>
        {imageErrors && (
          <div className="flex flex-col items-center gap-1 text-red-600 font-Poppins font-semibold">
            <span>{imageErrors}</span>
          </div>
        )}
        {Object.values(errors).some((error) => !!error) && (
          <div className="flex flex-col items-center gap-1 text-red-500 mb-2 font-Poppins font-semibold">
            {Object.values(errors).map(
              (error, index) =>
                !error.includes("is required") && (
                  <span key={index}>{error}</span>
                )
            )}
          </div>
        )}

        {isFormSubmitted && (
          <div className="flex flex-col items-center gap-1 text-green-500 mb-2 font-Poppins font-semibold">
            <span>Dorm updated successfully</span>
          </div>
        )}

        <div className="flex justify-center pb-16">
          <button
            className="bg-[#092F88] font-bold text-[#FFFFFF] px-6 py-2 rounded-2xl mr-4 hover:transition-all hover:scale-110 duration-300"
            onClick={submitForm}
          >
            Save Changes
          </button>
          <button
            className="bg-[#C10206] font-bold text-[#FFFFFF] px-6 py-2 rounded-2xl hover:transition-all hover:scale-110 duration-300"
            onClick={() => router.push(`${NEXT_PUBLIC_BASE_WEB_URL}/detail/${params.id}`)}
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}