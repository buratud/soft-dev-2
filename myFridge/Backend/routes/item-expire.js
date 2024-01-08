const express = require('express');
const router = express.Router();

const database = require('../shared/database');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
require('dotenv').config({ path: __dirname + '../../../.env' });

// Function to fetch the item count for a user based on their token
const fetchExpireCount = async (token, res) => {
    try {
        const tokenContent = token.split(" ")[1];

        jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
            if (err) {
                return res.status(401).send({
                    ok: false, error: 'Unauthorized Request'
                });
            }

            console.log(data.user_id);

            const expireData = await database.executeQuery({
                query: 'SELECT SUM(CASE WHEN s.expire_3days = 1 AND i.expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL 3 DAY THEN 1 WHEN s.expire_5days = 1 AND i.expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL 5 DAY THEN 1 WHEN s.expire_1week = 1 AND i.expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL 7 DAY THEN 1 ELSE 0 END) AS expireCount FROM items_info i INNER JOIN app_settings_info s ON i.user_id = s.user_id WHERE i.user_id = ?',
                values: [data.user_id]
            });

            if ('error' in expireData) {
                return res.status(500).send({
                    ok: false, error: expireData.error.userError
                });
            }

            console.log(expireData);

            return res.json({
                ok: true,
                expireCount: expireData[0].expireCount,
                data: expireData
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false, error: 'An error occurred while fetching expire count.'
        });
    }
};

router.get('/', async (req, res, next) => {
    const tokenInput = req.headers.authorization;
    console.log("Request Auth Info: ", tokenInput);

    // Call the fetchExpireCount function to fetch the item count
    fetchExpireCount(tokenInput, res);
});

module.exports = router;
