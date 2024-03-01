const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const { PORT } = require("./config");
const { BASE_SERVER_PATH, SUPABASE_URL, SUPABASE_KEY, LOG_LEVEL } = require("./config");
const logger = require('pino')({ level: LOG_LEVEL || 'info' });
const cors = require("cors");
const Sentry = require("@sentry/node");
const app = express();
const api = express.Router();

Sentry.init({
  dsn: "https://855f86989b23867e7eeccee682fbc826@linux-vm-southeastasia-3.southeastasia.cloudapp.azure.com/3",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(cors());
app.use(express.json());
app.use(BASE_SERVER_PATH, api);

api.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

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
      console.log(userID)
      res.status(200).json({user: userID , success: true});
    }
  }
  else{
    res.status(400).json({success : false});
  }
})

api.post('/profile-picture', async (req, res) => {
  const { userID } = req.body;
  if (userID) {
    const { data } = await supabase
        .from("users")
        .select("picture, role")
        .eq("id", userID)
        .single();
    res.status(200).json({ data });
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

//----------------admin-------------------

api.get('/getproblems', async (req, res) => {
  const { data, error } = await supabase.from('problems').select('unique_id, date_create, email, type, problem, status').neq('status', 'Unsent');
  const issues = data.sort(function(a, b){
    let x = a.date_create.toLowerCase();
    let y = b.date_create.toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  }).map((issue, index) => {issue.Id = index + 1; return issue;});
  if (error) {
    res.status(500).json(error);
  } else {
    res.status(200).json(issues);
  }
})

api.put('/updatestatus', async (req, res) => {
  const { unique_id, status } = req.body;
  const { data, error } = await supabase.from('problems').update({ status }).eq('unique_id', unique_id);
  if (error) {
    res.status(500).json(error);
  } else {
    res.status(200).json(data);
  }
})

//-----------------blog-------------------

api.post('/liked_blog', async (req, res) => {
  const { user } = req.body;
  try {
    const { data, error } = await supabase
      .from('like_blog')
      .select('*,blog(*,blog_category(category),users(username))')
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

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
