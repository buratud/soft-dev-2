/*const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// นำเข้าโมเดล User ที่เราสร้างขึ้น
const User = mongoose.model("User");

// เส้นทาง API สำหรับการลงทะเบียนผู้ใช้งาน
router.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  // ตรวจสอบว่าข้อมูลฟอร์มถูกต้องหรือไม่
  if (!username || !email || !password) {
    return res.status(400).json({ error: "ข้อมูลไม่ถูกต้อง" });
  }

  try {
    // สร้าง instance ของ User ด้วยข้อมูลที่รับมา
    const user = new User({ username, email, password });

    // บันทึกข้อมูลผู้ใช้งานลงในฐานข้อมูล
    await user.save();

    // ส่งข้อมูลผู้ใช้งานที่ลงทะเบียนเรียบร้อยกลับ
    res.status(201).json(user);
  } catch (error) {
    // ถ้าเกิดข้อผิดพลาดในการบันทึกข้อมูล
    res.status(500).json({ error: "ไม่สามารถลงทะเบียนผู้ใช้งานได้" });
  }
});

module.exports = router; */
