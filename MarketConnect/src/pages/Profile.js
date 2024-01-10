import NavBar from "../components/NavBar";
import "./Profile.scoped.css";
import { PopChat } from "../components/PopChat";
import axios from "axios";
import { AuthContext, useSupabase } from "../App";
import { useContext, useEffect, useState } from "react";

function readFileDataAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.onerror = (err) => {
      reject(err);
    };

    reader.readAsDataURL(file);
  });
}

const EditProfile = (props) => {
  const { edit, editCallback, user, supabase } = props;
  const [isLoading, setLoading] = useState(true);
  const [img, setImg] = useState(
    "https://anime.atsit.in/th/wp-content/uploads/2022/07/e0b984e0b88be0b895e0b8b2e0b8a1e0b8b0e0b8aae0b8b2e0b8a1e0b8b2e0b8a3e0b896e0b8abe0b8b2e0b8a2e0b983e0b888e0b983e0b899e0b8ade0b8a7e0b881.webp"
  );
  useEffect(() => {
    const {
      data: { publicUrl },
    } = supabase.storage.from("Profile_User").getPublicUrl(user?.id + ".png");
    if (publicUrl) {
      const timestamp = Date.now().toString();
      setImg(publicUrl + `?timestamp=${timestamp}`);
    }
    setLoading(false);
  }, [user]);

  const save = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (event.target[3].files[0] !== undefined)
      axios
        .post("http://localhost:3200/save", {
          firstname: event.target[0].value,
          lastname: event.target[1].value,
          contact: event.target[2].value,
          img: (await readFileDataAsBase64(event.target[3].files[0])).split(
            ","
          )[1],
          id: user?.id,
        })
        .then((res) => {
          alert("Update profile success");
          supabase.auth.refreshSession();
          editCallback();
        })
        .catch((err) => {
          alert(err);
        });
    else
      axios
        .post("http://localhost:3200/save", {
          firstname: event.target[0].value,
          lastname: event.target[1].value,
          contact: event.target[2].value,
          img: "not",
          id: user?.id,
        })
        .then((res) => {
          alert("Update profile success");
          supabase.auth.refreshSession();
          editCallback();
        })
        .catch((err) => {
          alert(err);
        });
  };
  if (isLoading) {
    return (
      <div className="Loading">
        <div className="loader" />
        <p>Loading...</p>
      </div>
    );
  } else if (edit)
    return (
      <div className="form-box">
        <form onSubmit={save}>
          <label htmlFor="firstname">FirstName</label>
          <input
            type="text"
            name="firstname"
            defaultValue={user?.user_metadata?.firstname ?? ""}
          />
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            name="lastname"
            defaultValue={user?.user_metadata?.lastname ?? ""}
          />
          <label htmlFor="contact">Contact Number</label>
          <input
            type="text"
            name="contact"
            defaultValue={user?.user_metadata?.contact ?? ""}
          />
          <label htmlFor="changepicture">Picture</label>
          <input type="file" name="changepicture" />
          <div className="button">
            <button
              type="button"
              className="cancel-button"
              onClick={editCallback}
            >
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  else
    return (
      <div>
        <div className="form-box-2">
          <div className="pic-profile-box">
            <img src={img} alt="" />
          </div>
          <div className="text-profile-box">
            <h3>FirstName</h3>
            <p>{user?.user_metadata?.firstname ?? "-"}</p>
            <h3>Lastname</h3>
            <p>{user?.user_metadata?.lastname ?? "-"}</p>
            <h3>Contact Number</h3>
            <p>{user?.user_metadata?.contact ?? "-"}</p>
            <div className="button-2">
              <button className="save-button" onClick={editCallback}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

const Profile = () => {
  const supabase = useSupabase();
  const [isEdit, setEdit] = useState(false);
  const { user } = useContext(AuthContext);
  const editProfile = () => {
    setEdit(!isEdit);
  };

  return (
    <div className="container">
      <NavBar />
      {/* <PopChat messages={[]} /> */}
      <div className="main">
        <h1>Edit Profile</h1>
        <EditProfile
          supabase={supabase}
          user={user}
          edit={isEdit}
          editCallback={editProfile}
        />
      </div>
    </div>
  );
};

export default Profile;
