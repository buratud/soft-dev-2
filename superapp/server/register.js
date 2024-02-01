// const express = require('express');
// const cors = require('cors');
// const { createClient } = require('@supabase/supabase-js');
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// // const port = process.env.PORT;
// const supabaseUrl = "https://nypzyitcvjrnisjdsbpk.supabase.co";
// const supabaseKey = process.env.SUPERAPP_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

// app.post("/register", async (req, res) => {
//     const { username, email, password } = req.body;
//     const { data, error } = await supabase.auth.signUp({
//         email: email,
//         password: password,
//         options: {
//             data: {
//                 username: username,
//             }
//         }
//     });

//     if (error) {
//         res.status(500).json({ error: error.message });
//     } else {
//         res.status(200).json({ message: "User go to verify page" });
//     }
// });

// app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require("dotenv").config();
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
// const port = process.env.PORT;
const supabaseUrl = "https://nypzyitcvjrnisjdsbpk.supabase.co";
const supabaseKey = process.env.SUPERAPP_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));