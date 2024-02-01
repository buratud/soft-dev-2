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

// app.get("/test", async (req, res) => {
//     const { username, email, password } = req.body;
//     const { data, error } = await supabase
//     .from('auth.users')
//     .select('*'); // '*' selects all columns, you can specify specific columns if needed

//     if (error) {
//         console.error({error : error});
//     } else {
//         console.log('Data from auth.users:', data);
//     }
//     });

// app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));