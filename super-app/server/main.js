const express = require("express");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const { PORT } = require("./config");
const { BASE_SERVER_PATH, SUPABASE_URL, SUPABASE_KEY } = require("./config");
const cors = require("cors");

const app = express();
const api = express.Router();

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(cors());
app.use(express.json());
app.use(BASE_SERVER_PATH, api);

api.get("/", (req, res) => {
  res.send(JSON.stringify(req));
});

//Authentication

api.put("/login", async (req, res) => {
  const { UsernameorEmail } = req.body;

  let { data: users, errors } = await supabase
    .from("users")
    .select("*")
    .eq("username", UsernameorEmail);

  if (users.length === 0) {
    res
        .status(200)
        .json({ email: UsernameorEmail });
  } else {
    res
        .status(200)
        .json({ email: users[0].email });
  }
});

api.put("/register", async (req, res) => {
  const { email, username } = req.body;

  let { data: users, errors } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);

  if (errors) {
    res.status(500).json(errors);
  } else {
    if (users.length === 0) {
      res.status(200).json({ next: true });

    } else {
      res.status(400).json({ message: "This username already used", next: false });
    }
  }
});

api.put('/update-username', async (req) => {
  const { email, username, data } = req.body;

  const { insert_username, err } = await supabase
    .from("users")
    .upsert([{ id: data.user.id, username: username, email: email }], {
      onConflict: ["email"],
    })
    .select();
})

//-----------------------------superapp home page-----------------------------------

api.post("/recommended-blog", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("randomblog")
      // .select('*');
      .select("blog_id,title,category,body,blogger,date,cover_img");
    // .limit(3);
    if (error) {
      throw error;
    } else {
      console.log('data',data)
      res.status(200).json(data);
    }
  } catch (error) {
    console.log('error',error)
    res.status(500).json({ error: "Internal Server Error" });
  }
});

api.post("/recommended-product", async (req, res) => {
  try {
    const { data, error } = await supabase.from("product").select("*");
    const MaxRecommended = req.body.MaxRecommended || 3;

    if (error) {
      throw error;
    } else {
      const randomProduct = (Count) => {
        let newData = [];
        for (let i = 0; i < Count; i++) {
          let randomNumber = Math.floor(Math.random() * data.length);
          newData[i] = data[randomNumber];
          data.splice(randomNumber, 1);
        }
        return newData;
      };
      res.status(200).json(randomProduct(MaxRecommended));
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//-----------------------------Edit profile-----------------------------------


//-----------------------------profile-----------------------------------
api.post('/profile-picture', async (req, res) => {
  const { userID } = req.body;
  if (userID) {
    const { data } = await supabase
      .from("users")
      .select("picture")
      .eq("id", userID);
    const picture = data[0]?.picture;
    res.status(200).json({ picture });
  }
})
//-----------------blog-------------------

api.post('/liked_blog', async (req, res) => {
  const {user} = req.body;
  try {
    const { data, error } = await supabase
    .from('likedblog') 
    .select('*')
    .eq('user_id',user)
    if (error) {
        throw error;
    } else {
        res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json(error);
  }
})

api.post('/your_blog', async (req, res) => {
  const {user} = req.body;
  try {
    const { data, error } = await supabase
    .from('yourblog') 
    .select('blog_id,title,category,body,blogger,date,cover_img')
    .eq('user_id',user)
    if (error) {
        throw error;
    } else {
        res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//-----------------market-------------------

api.post('/your_product', async (req, res) => {
  const {user} = req.body;
  try {
    const { data, error } = await supabase
    .from('yourproduct') 
    .select('*')
    .eq('user_id',user)
    if (error) {
        throw error;
    } else {
        res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json(error);
  }
})


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
