const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());
// const port= process.env.PORT;
const supabaseUrl = "https://nypzyitcvjrnisjdsbpk.supabase.co";
const supabaseKey = process.env.SUPERAPP_KEY;
const supabase = createClient(supabaseUrl,supabaseKey);

app.post("/login", async (req,res) => {
    const {UsernameorEmail,password} = req.body;

    console.log(UsernameorEmail,password)

    const { data, error } = await supabase.auth.signInWithPassword({
        email: UsernameorEmail,
        password: password,
    });

    if (error){
        res.status(400).json({ error: error.message });
    }
    else{
        res.status(200).json({data, message : "User logined successfully"});
    }
});

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));