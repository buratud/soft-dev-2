const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const port = require('./config').PORT;

const app = express();

const SUPABASE_URL = "https://nypzyitcvjrnisjdsbpk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55cHp5aXRjdmpybmlzamRzYnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3MTY3MTYsImV4cCI6MjAyMjI5MjcxNn0.MomIyp4TbTPZqADXu1CeU9pyw3DDy9zsySSFZXUy_kY";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);



app.use(express.json());

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
  
app.listen(port, () => console.log(`Server is running on port ${port}`));