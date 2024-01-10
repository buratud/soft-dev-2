require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { decode } = require("base64-arraybuffer");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://ooitkismzzkxarjmwdeb.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const port = 3200;

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  // console.log(data);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/sendsupport", async (req, res) => {
  const { email, message, status, contact } = req.body;
  const { data, error } = await supabase.from("Support").insert({
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

app.post("/getsupport", async (req, res) => {
  const { email } = req.body;
  const { data, error } = await supabase
    .from("Support")
    .select("Problem,Status,id")
    .eq("Sender", email);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/adminsupport", async (req, res) => {
  const { data, error } = await supabase
    .from("Support")
    .select("Problem,Status,id,Sender,Contact");
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/changestatus", async (req, res) => {
  const { status, id } = req.body;
  const { data, error } = await supabase
    .from("Support")
    .update({ Status: status })
    .eq("id", id);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/unsendsupport", async (req, res) => {
  const { id } = req.body;
  const { data, error } = await supabase
    .from("Support")
    .delete()
    .eq("id", id);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/fooddetail", async (req, res) => {
  const { foodid } = req.body;
  const { data, error } = await supabase
    .from("Food")
    .select(
      "Food_Name, Price, Description, URL,Line,Catagory_Id, User(firstname,lastname,contact), Catagory(catagory_name)"
    )
    .eq("id", foodid);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/food", async (req, res) => {
  const { data, error } = await supabase
    .from("Food")
    .select("id, Food_Name, Price,URL");
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/getAdmin", async (req, res) => {
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

app.post("/yourfood", async (req, res) => {
  const { user } = req.body;
  const { data, error } = await supabase
    .from("Food")
    .select("id, Food_Name, Price, URL")
    .eq("Shopkeeper_Id", user);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/new", async (req, res) => {
  const { data, error } = await supabase
    .from("Food")
    .select("id, Food_Name, Price, URL")
    .order("created_at", { ascending: false })
    .limit(4);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/pro", async (req, res) => {
  const { data, error } = await supabase.from("Promotion").select(" URL");
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/verify", async (req, res) => {
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

app.post("/save", async (req, res) => {
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

app.post("/delete", async (req, res) => {
  const { food } = req.body;
  const { data, error } = await supabase
    .from("Food")
    .delete()
    .eq("id", food);
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/addproduct", async (req, res) => {
  const { name, price, catagory_id, id, description, picture, line } = req.body;
  const { data, error } = await supabase.from("Food").insert({
    Food_Name: name,
    Catagory_Id: catagory_id,
    Price: price,
    Shopkeeper_Id: id,
    Description: description,
    URL: picture,
    Line: line,
  });
  if (error) {
    res.status(400).json(error);
  } else {
    res.status(200).json(data);
  }
});

app.post("/manageproduct", async (req, res) => {
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
    .from("Food")
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

app.listen(port, () => console.log(`Express app running on port ${port}`));
