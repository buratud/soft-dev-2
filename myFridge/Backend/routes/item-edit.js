const express = require('express');
const router = express.Router();

const database = require('../shared/database');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const multer = require('multer');
const upload = multer();
require('dotenv').config({ path: __dirname + '../../../.env' });

// Fetch item by ID
router.get('/', async (req, res, next) => {
    const tokenInput = req.headers.authorization;
    var items_id = req.query.items_id
    // res.send(items_id).status(200)
    console.log(items_id);
    console.log("Request Auth Info from item edit: ", tokenInput);
    var tokenContent = tokenInput.split(" ")[1];

    jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
        if (err) {
            return res.status(401).send({
                ok: false, error: 'Unauthorized Request'
            });
        }

        try {
            const itemData = await database.executeQuery({
                query: 'SELECT items_id, item_name, expiry_date, quantity, item_picture FROM items_info WHERE user_id = ? AND items_id = ?',
                values: [data.user_id, items_id]
            });
            console.log(data.user_id)
            console.log(items_id)

            if ('error' in itemData) {
                return res.status(500).send({
                    ok: false, error: itemData.error.userError
                });
            }

            if (itemData.length === 0) {
                return res.status(404).send({
                    ok: false, error: 'Item not found'
                });
            }

            return res.json({
                ok: true,
                data: itemData[0],
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                ok: false, error: 'Internal Server Error'
            });
        }
    });
    // return res.status(500).send({
    //     ok: false, error: 'How it jumps here'
    // });
});

// Update item by ID
router.put('/', upload.none(), async (req, res, next) => {
    console.log("Put are here...")
    const tokenInput = req.headers.authorization;
    var itemId = req.query.items_id; // Extract the item ID from the request parameters
    const updatedData = req.body; // Updated item data sent by the user

    console.log("Request Auth Info: ", tokenInput);
    var tokenContent = tokenInput.split(" ")[1];

    console.log('updatedData : ',req.body)

    jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
        if (err) {
            return res.status(401).send({
                ok: false, error: 'Unauthorized Request'
            });
        }

        console.log(data.user_id);

        try {
            // Update item data by ID
            const updateResult = await database.executeQuery({
                query: 'UPDATE items_info SET item_name = ?, expiry_date = ?, quantity = ? WHERE user_id = ? AND items_id = ?',
                values: [updatedData.item_name, updatedData.expiry_date, updatedData.quantity, data.user_id, itemId]
            });
            console.log(updatedData.item_name, updatedData.expiry_date, updatedData.quantity, data.user_id, itemId)

            if ('error' in updateResult) {
                return res.status(500).send({
                    ok: false, error: updateResult.error.userError
                });
            }

            if (updateResult.affectedRows === 0) {
                return res.status(404).send({
                    ok: false, error: 'Item not found'
                });
            }

            return res.json({
                ok: true,
                message: 'Item updated successfully',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                ok: false, error: 'Internal Server Error'
            });
        }
    });
});

module.exports = router;
