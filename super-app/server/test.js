const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
// const port = process.env.PORT;
const supabaseUrl = "https://nypzyitcvjrnisjdsbpk.supabase.co";
const supabaseKey = process.env.SUPERAPP_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post("/test", async (req, res) => {
    const { username, email, password } = req.body;
    const userId = "aa79277c-6d96-4753-b1b7-2133de4dd4e6"; // Assuming id is the user's unique identifier

    const { profileData, profileError } = await supabase
    .from("profiles") // ปรับเป็นตารางที่ถูกต้องตาม schema ของคุณ
    .upsert([
        {
            username: username,
            id: userId,
            // เพิ่มข้อมูลโปรไฟล์อื่น ๆ ตามต้องการ
        },
    ])
    
if (profileError) {
    console.error(profileError);
} else {
    console.log('Profile data inserted successfully:', profileData);
    res.status(200).json({ message: "User go to verify page" });
}
});

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));