const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const config = require('./config')
const port = config.PORT;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const app = express();
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