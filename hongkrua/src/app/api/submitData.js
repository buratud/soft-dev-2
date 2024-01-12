// pages/api/submitData.js

export default function handler(req, res) {
    if (req.method === 'POST') {
      // ดึงข้อมูลที่ผู้ใช้กรอกจาก req.body
      const { comments } = req.body;
  
      // ทำอะไรกับข้อมูล, เช่น บันทึกลงในฐานข้อมูล
      // ในกรณีนี้เราแค่แสดงข้อมูลที่รับมาใน console
      console.log('ข้อมูลที่รับมา:', comments);
  
      // ส่งการตอบกลับไปยัง client
      res.status(200).json({ success: true });
    } else {
      res.status(405).end(); // ไม่อนุญาตให้ใช้เมธอดอื่นนอกจาก POST
    }
  }
  