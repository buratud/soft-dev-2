const express = require('express');
const router = express.Router();

const database = require('../shared/database');
const jwt = require('jsonwebtoken')

const multer = require('multer')
const formData = require("express-form-data");
// const upload = multer({ 
//     dest: 'uploads/',  
//     limits: {
//         fileSize: 50000000,
//     }
// })

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + '.png');
    }
  });
  
var upload = multer({ storage: storage });


require('dotenv').config({ path: __dirname + '../../../.env' });

router.post('/',upload.single('image'), async (req, res, next) => {
    // console.log('body',req.body)
    var fileName = req.file.filename
    console.log(req.file)
    if (fileName === undefined) {
        console.log("No File name")
        return res.send(500)
    }
    // console.log('file ',req.file)
    // console.log('content ',req.body.itemInfo)
    const { item_name, quantity, expiry_date } = JSON.parse(req.body.itemInfo);
    try {
        const tokenInput = req.headers.authorization;
        console.log("Request Auth Info: ", tokenInput)
        var tokenContent = tokenInput.split(" ")[1]
        jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
            if (err) {
                return res.status(401).send({
                    ok: false,
                    error: 'Unauthorized Request'
                });
            }
            const userId = data.user_id;
            fileName = process.env.NEXT_PUBLIC_API_URL_2 + "/imageData/" + fileName;

            // Check if the item already exists
            const existingItem = await database.executeQuery({
                query: 'SELECT * FROM items_info WHERE user_id = ? AND item_name = ?',
                values: [userId, item_name]
            });

            if (existingItem.length > 0) {
                // Item with the same name already exists, return a 409 Conflict response.
                return res.status(409).send({
                    ok: false,
                    error: 'Item with the same name already exists'
                });
            }

            // Insert the new item into the database.
            const itemData = await database.executeQuery({
                query: 'INSERT INTO items_info( user_id, item_name, quantity, expiry_date, item_picture) VALUES (?, ?, ?, ?, ?)',
                values: [userId, item_name, quantity, expiry_date, fileName]
            });

            if ('error' in itemData) {
                return res.status(500).send({
                    ok: false,
                    error: itemData.error.userError
                });
            }

            return res.status(200).send({
                ok: true,
                imgPath: fileName
            });
        });
    } catch (e) {
        console.log("Some Error going on...")
        console.error(e)
        res.sendStatus(500)
    }
});

// router.get('/image',express.static('public'))

module.exports = router;