const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const { PORT } = require('./config');
const { BASE_SERVER_PATH } = require('./config');
const app = express();
require("dotenv").config();
const api = express.Router();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(express.json());
app.use(BASE_SERVER_PATH, api)
app.use(express.json());
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://nypzyitcvjrnisjdsbpk.supabase.co";
const supabase = createClient(supabaseUrl,supabaseKey);

api.get('/', (req, res) => {
  res.send(JSON.stringify(req));
});

app.put("/login", async (req,res) => {
  const {UsernameorEmail,password} = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
      email: UsernameorEmail,
      password: password,
  });

  if (error){
      res.status(400).json();
      // res.status(400).json({ error: error.message });
  }
  else{
      res.status(200).json({data, message : "User logined successfully"});
  }
});

app.post("/register", async (req, res) => {
  const {  email, username, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
          data: {
              username: username,
          }
      }
  });

  if (error) {
      res.status(500).json({ error: error.message });
  } else {
      res.status(200).json({ message: "User go to verify page" });
  }
});

api.put('/verify-otp', async (req, res) => {
  try {
    const {email,otp} = req.body;
  
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    });
  
    if (error) {
      throw error;
    }

    res.status(200).json({ message: 'OTP verified successfully' });

  } catch (error) {
    if(error.message.includes('invalid') || error.message.includes('expired')){
      res.status(500).json({ error: 'OTP has invalid or expired' });
    }else{
    console.log(error);
    res.status(500).json({ error: 'An error occurred while verifying OTP' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});