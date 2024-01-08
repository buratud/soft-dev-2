const express = require('express');
const router = express.Router();

const database = require('../shared/database');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
require('dotenv').config({ path: __dirname + '../../../.env' });

// Function to fetch the item count for a user based on their token
const fetchProfData = async (token, res) => {
    try {
        const tokenContent = token.split(" ")[1];

        jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
            if (err) {
                return res.status(401).send({
                    ok: false, error: 'Unauthorized Request'
                });
            }

            console.log(data.user_id);

            const profData = await database.executeQuery({
                query: 'SELECT email, display_name, username AS profData FROM user_info WHERE user_id = ?',
                values: [data.user_id]
            });

            if ('error' in profData) {
                return res.status(500).send({
                    ok: false, error: profData.error.userError
                });
            }

            console.log(profData);

            return res.json({
                ok: true,
                userData: profData[0].userData,
                data: profData
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false, error: 'An error occurred while fetching user data.'
        });
    }
};

router.get('/', async (req, res, next) => {
    const tokenInput = req.headers.authorization;
    console.log("Request Auth Info: ", tokenInput);

    // Call the fetchProfData function to fetch the item count
    fetchProfData(tokenInput, res);
});

module.exports = router;