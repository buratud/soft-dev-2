const express = require('express');
const router = express.Router();

const database = require('../shared/database');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
require('dotenv').config({ path: __dirname + '../../../.env' });

router.get('/', async (req, res, next) => {
    const tokenInput = req.headers.authorization;
    console.log("Request Auth Info: ", tokenInput);
    var tokenContent = tokenInput.split(" ")[1];

    jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
        if (err) {
            return res.status(401).send({
                ok: false, error: 'Unauthorized Request'
            });
        }
        console.log(data.user_id);
        const itemData = await database.executeQuery({
            query: 'SELECT item_name, expiry_date, quantity, item_picture FROM items_info WHERE user_id = ? ORDER BY quantity ASC',
            values: [data.user_id]
        });

        if ('error' in itemData) {
            return res.status(500).send({
                ok: false, error: itemData.error.userError
            });
        }

        console.log(itemData);

        return res.json(
            {
                ok : true,
                number : 123,
                data : itemData
            }
        );
    });
});

module.exports = router;
