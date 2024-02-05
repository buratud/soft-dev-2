const express = require('express');
const cors = require('cors');
//const { PORT } = require('./config');
const PORT = process.env.PORT || 3000;
const { BASE_SERVER_PATH } = require('./config');
const app = express();
require("dotenv").config();
const api = express.Router();
app.use(BASE_SERVER_PATH, api)
app.use(express.json());
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://nypzyitcvjrnisjdsbpk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55cHp5aXRjdmpybmlzamRzYnBrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjcxNjcxNiwiZXhwIjoyMDIyMjkyNzE2fQ.vgaabgGFddkMQCXraluX7tFizR3CfLtXKjemIPQ-Lgo";
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

app.put('/verify-otp', async (req, res) => {
  try {
    const {email,otp} = req.body;
  
    // Verify the OTP
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
    res.status(500).json({ error: 'OTP has expired or is invalid ' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});