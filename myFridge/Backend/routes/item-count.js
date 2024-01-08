const express = require('express');
const router = express.Router();

const database = require('../shared/database');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
require('dotenv').config({ path: __dirname + '../../../.env' });

// Function to fetch the item count for a user based on their token
const fetchItemCount = async (token, res) => {
    try {
        const tokenContent = token.split(" ")[1];

        jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
            if (err) {
                return res.status(401).send({
                    ok: false, error: 'Unauthorized Request'
                });
            }

            console.log(data.user_id);

            const itemData = await database.executeQuery({
                query: 'SELECT COUNT(*) AS itemCount FROM items_info WHERE user_id = ?',
                values: [data.user_id]
            });

            if ('error' in itemData) {
                return res.status(500).send({
                    ok: false, error: itemData.error.userError
                });
            }

            console.log(itemData);

            return res.json({
                ok: true,
                itemCount: itemData[0].itemCount,
                data: itemData
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false, error: 'An error occurred while fetching item count.'
        });
    }
};

router.get('/', async (req, res, next) => {
    const tokenInput = req.headers.authorization;
    console.log("Request Auth Info: ", tokenInput);

    // Call the fetchItemCount function to fetch the item count
    fetchItemCount(tokenInput, res);
});

module.exports = router;
