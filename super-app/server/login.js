const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require("dotenv").config();
const config = require('./config.js');


const app = express();

app.use(cors());
app.use(express.json());
// const port= process.env.PORT;
const port = 3300;
const supabaseUrl = "https://nypzyitcvjrnisjdsbpk.supabase.co";
const supabaseKey = process.env.SUPERAPP_KEY;
const supabase = createClient(supabaseUrl,supabaseKey);

app.post("/login", async (req,res) => {
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

app.listen(port, () => console.log(`Server is running on port ${port}`));