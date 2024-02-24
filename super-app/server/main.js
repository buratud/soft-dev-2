const express = require("express");
const { createClient } = require("@supabase/supabase-js");
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

api.get('/users/:id', async (req, res) => {
  try {
    const { data: users, error } = await supabase.from('users').select().eq('id', req.params.id);
    if (error) {
      res.status(500).send();
      return;
    }
    if (users.length === 0) {
      res.status(404).send();
      return;
    }
    res.json(users[0]);
  } catch (error) {
    res.status(500).send();
  }
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
      .rpc('get_random_blog')
    if (error) {
      throw error;
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ error: "Internal Server Error" });
  }
});

api.post("/recommended-product", async (req, res) => {
  try {
    const { data, error } = await supabase.from("MarketConnect_Food").select("*");
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
        //console.log(newData);
        return newData;
      };
      res.status(200).json(randomProduct(MaxRecommended));
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//-----------------------------Profile-----------------------------------

api.post('/get-userID-from-username', async (req, res) => {
  const { username } = req.body;
  if(username){
    const {data: userID , error} = await supabase
      .from('users')
      .select('id')
      .eq('username',username)
      .single();
    if(error){
      console.log(error);
      res.status(400).json({success : false});
    }else{
      res.status(200).json({userID , success: true});
    }
  }
})

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

api.post('/profile-username', async (req, res) => {
  const { userID } = req.body;
  if (userID) {
    const { data } = await supabase
      .from("users")
      .select("username")
      .eq("id", userID);
    const username = data[0]?.username;
    res.status(200).json({ username });
  }
})

api.post('/set-profile', async (req, res) => {
  const { userID, username, imageURL } = req.body;
  if (userID) {
    let SameUserName = [];
    let oldPicture = '';

    if (imageURL) {
      let { data } = await supabase
        .from("users")
        .select("picture")
        .eq("id", userID);
      oldPicture = data[0]?.picture;

    }

    if (username) {
      let { data: users } = await supabase
        .from("users")
        .select("*")
        .eq("username", username);
      SameUserName = users;
    }

    if (SameUserName.length === 0) {
      if (imageURL && username) {
        const filename = imageURL.substring(imageURL.lastIndexOf('/') + 1);
        const oldFilename = oldPicture.substring(oldPicture.lastIndexOf('/') + 1);
        if (oldFilename && oldFilename !== 'PersonCircle.svg') {
          await supabase.storage.from('Profile_User').remove(oldFilename);
        }
        const { error } = await supabase.from('users').update({ username: username, picture: imageURL }).eq('id', userID)
        if (error) {

          await supabase.storage.from('Profile_User').remove(filename);
          console.log(`error : `);
          console.log(error);

        } else {

          res.status(200).json({ message: 'Update Profile Success' });

        }
      }
      else if (imageURL) {
        const filename = imageURL.substring(imageURL.lastIndexOf('/') + 1);
        const oldFilename = oldPicture.substring(oldPicture.lastIndexOf('/') + 1);
        if (oldFilename && oldFilename !== 'PersonCircle.svg') {
          await supabase.storage.from('Profile_User').remove(oldFilename);
        }
        const { error } = await supabase.from('users').update({ picture: imageURL }).eq('id', userID)
        if (error) {

          await supabase.storage.from('Profile_User').remove(filename);
          console.log(`error : `);
          console.log(error);

        } else {

          res.status(200).json({ message: 'Update Profile Success' });

        }
      }
      else if (username) {
        const { error } = await supabase.from('users').update({ username: username }).eq('id', userID)
        if (error) {
          res.status(200).json({ message: 'Update Profile Error' });
        } else {

          res.status(200).json({ message: 'Update Profile Success' });

        }
      }
      else {
        res.status(200).json({ message: 'No input' });
      }

    } else {

      await supabase.storage.from('Profile_User').remove(filename);
      res.status(200).json({ message: 'Update failed new username already used', err: true });

    }

  }
})

//-----------------blog-------------------

api.post('/liked_blog', async (req, res) => {
  const { user } = req.body;
  try {
    const { data, error } = await supabase
      .from('like_blog')
      .select('*,blog(*,blog_category(category)),users(username)')
      .eq('user_id', user)
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
  const { user } = req.body;
  try {
    const { data, error } = await supabase
      .from('blog')
      .select('*,users(username),blog_category(category)')
      .eq('blogger', user)
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
  const { user } = req.body;
  try {
    const { data, error } = await supabase
      .from('MarketConnect_Food')
      .select('*')
      .eq('Shopkeeper_Id', user)
    if (error) {
      throw error;
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
