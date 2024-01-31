const mongoose = require("mongoose");

// สร้าง Schema สำหรับโมเดล User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // ต้องไม่ซ้ำกัน
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user", 
  },
});

// สร้างโมเดล User จาก Schema
const User = mongoose.model("User", userSchema);

module.exports = User;
