const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const { PORT } = require('./config');
const { BASE_SERVER_PATH } = require('./config');
const app = express();
const api = express.Router();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.use(express.json());
app.use(BASE_SERVER_PATH, api)

api.get('/', (req, res) => {
  res.send(JSON.stringify(req));
});

api.put("/login", async (req,res) => {
  const {UsernameorEmail,password} = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
      email: UsernameorEmail,
      password: password,
  });

  if (error){
      res.status(500).json(error);
  }
  else{
      res.status(200).json({data, message : "User logined successfully"});
  }
});

api.post("/register", async (req, res) => {
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
      res.status(500).json(error);
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

//-----------------------------superapp home page-----------------------------------

api.post('/recommended-blog', async (req, res) => {
  const { data: maximum, error: err } = await supabase
    .from('blog')
    .select('blog_id')
    .order('blog_id', { ascending: false })
    .limit(1);
    if (err) {
      res.status(500).json(err);
    } else {
      const randomNum1 = Math.floor(Math.random() * maximum[0].blog_id) + 1;
      const randomNum2 = Math.floor(Math.random() * maximum[0].blog_id) + 1;
      const randomNum3 = Math.floor(Math.random() * maximum[0].blog_id) + 1;

      const { data, error } = await supabase
        .from('blog')
        .select('blog_id,title,category,body,blogger,date,cover_img')
        .in('blog_id', [randomNum1, randomNum2, randomNum3]);
        if (error) {
          console.log('000000000000')
          res.status(500).json(error);
        } else {
          console.log(data)
          res.status(200).json(data);
        }
    }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});