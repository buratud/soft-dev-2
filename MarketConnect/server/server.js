const express = require("express");
const cors = require("cors");
const { decode } = require("base64-arraybuffer");
const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_KEY, PORT, BASE_SERVER_PATH } = require("./config");
const { search } = require("./search");
const Sentry = require("@sentry/node");
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();
const api = express.Router();

Sentry.init({
  dsn: "https://0cb04c4378c1eaa90769e0a5bfe4b7bb@o4507243238195200.ingest.de.sentry.io/4508396748800080",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(BASE_SERVER_PATH, api);

api.use(cors());
api.use(express.json({ limit: "50mb" }));

api.get('/testget', (req, res) => {
  res.status(200).json({ message: 'Hello from server!' });
});

api.post("/testpost", (req, res) => {
  const { email, password } = req.body;
  const data = { email: email, password: password };
  console.log(data);
  res.status(200).json(data);
});

api.post("/search", async (req, res) => {
  const { searchTerm } = req.body;
  const { data, error } = await supabase.from("MarketConnect_Food").select("id, Food_Name, Price, URL");
  console.log(data);
  const result = search(searchTerm, data);
  // console.log(result)
  
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(result);
  }
});

api.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  console.log(data);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/sendsupport", async (req, res) => {
  const { email, message, status, contact } = req.body;
  const { data, error } = await supabase.from("MarketConnect_Support").insert({
    Sender: email,
    Status: status,
    Problem: message,
    Contact: contact,
  });
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/getsupport", async (req, res) => {
  const { email } = req.body;
  const { data, error } = await supabase
    .from("MarketConnect_Support")
    .select("Problem,Status,id")
    .eq("Sender", email);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/adminsupport", async (req, res) => {
  const { data, error } = await supabase
    .from("MarketConnect_Support")
    .select("Problem,Status,id,Sender,Contact");
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/changestatus", async (req, res) => {
  const { status, id } = req.body;
  const { data, error } = await supabase
    .from("MarketConnect_Support")
    .update({ Status: status })
    .eq("id", id);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/unsendsupport", async (req, res) => {
  const { id } = req.body;
  const { data, error } = await supabase
    .from("MarketConnect_Support")
    .delete()
    .eq("id", id);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/fooddetail", async (req, res) => {
  const { foodid } = req.body;
  const { data, error } = await supabase
    .from("MarketConnect_Food")
    .select(
      "Food_Name, Price, Description, URL,Line,Catagory_Id, users(username,email), MarketConnect_Category(catagory_name)"
    )
    .eq("id", foodid);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});


api.post("/food", async (req, res) => {
  const { data, error } = await supabase
    .from("MarketConnect_Food")
    .select("id, Food_Name, Price,URL");
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/getAdmin", async (req, res) => {
  const { user } = req.body;
  const { data, error } = await supabase
    .from("User")
    .select("Admin")
    .eq("id_user", user);
  // console.log(data[0]);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data[0]);
  }
});

api.post("/yourfood", async (req, res) => {
  const { user } = req.body;
  const { data, error } = await supabase
    .from("MarketConnect_Food")
    .select("id, Food_Name, Price, URL")
    .eq("Shopkeeper_Id", user);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/new", async (req, res) => {
  const { data, error } = await supabase
    .from("MarketConnect_Food")
    .select("id, Food_Name, Price, URL")
    .order("created_at", { ascending: false })
    .limit(4);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/pro", async (req, res) => {
  const { data, error } = await supabase.from("MarketConnect_Promotion").select(" URL");
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/verify", async (req, res) => {
  const { email, token } = req.body;
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/save", async (req, res) => {
  const img = decode(req.body.img);
  const { firstname, lastname, contact, id } = req.body;
  const { data, error } = await supabase.auth.admin.updateUserById(id, {
    user_metadata: {
      firstname: firstname,
      lastname: lastname,
      contact: contact,
    },
  });
  const { error2 } = await supabase
    .from("User")
    .update({
      firstname: firstname,
      lastname: lastname,
      contact: contact,
    })
    .eq("id_user", id);
  if (img.byteLength !== 2) {
    await supabase.storage.from("Profile_User").upload(id + ".png", img, {
      contentType: "image/png",
      upsert: true,
    });
  }
  if (error || error2) {
    res.status(400).json(error || error2);
  } else {
    res.status(200).json(data);
  }
});

api.post("/delete", async (req, res) => {
  const { food } = req.body;
  const { data, error } = await supabase
    .from("MarketConnect_Food")
    .delete()
    .eq("id", food);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

api.post("/addproduct", async (req, res) => {
  const { name, price, catagory_id, id, description, picture, line } = req.body;
  const { data, error } = await supabase.from("MarketConnect_Food").insert({
    Food_Name: name,
    Catagory_Id: catagory_id,
    Price: price,
    Shopkeeper_Id: id,
    Description: description,
    URL: picture,
    Line: line,
  });
  console.log("req: " + req);
  console.log("data: " + data);
  if (error) {
    console.log("error: " + error);
    console.log("res1: " + res);
    res.status(400).json(error);
  } else {
    console.log("res2: " + res);
    res.status(200).json(data);
  }
});

api.post("/manageproduct", async (req, res) => {
  const {
    food,
    name,
    price,
    catagory_id,
    id,
    description,
    picture,
    line,
  } = req.body;
  const { data, error } = await supabase
    .from("MarketConnect_Food")
    .update({
      Food_Name: name,
      Catagory_Id: catagory_id,
      Price: price,
      Shopkeeper_Id: id,
      Description: description,
      URL: picture,
      Line: line,
    })
    .eq("id", food);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => console.log(`Express app running on port ${PORT}`));
