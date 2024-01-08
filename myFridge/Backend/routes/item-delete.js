const express = require('express');
const router = express.Router();

const database = require('../shared/database');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
require('dotenv').config({ path: __dirname + '../../../.env' });

router.delete('/', async (req, res, next) => {
    const tokenInput = req.headers.authorization;
    var items_id = req.query.items_id
    console.log("2222222222222222222222222",items_id);
    try {
        if (!req.session.userData) {
            return res.status(401).send({
                ok: false,
                error: 'Please login and try again later!'
            });
        }

        const updateQuery = {
            query: 'DELETE FROM items_info WHERE items_id = ?',
            values: [items_id]
        };

        const cartData = await database.executeQuery(updateQuery);

        if ('error' in cartData) {
            return res.status(500).send({
                ok: false,
                error: 'An error occurred while deleting the item.'
            });
        }

        return res.status(200).send({
            ok: true,
            data: cartData
        });
    } catch (error) {
        console.error('Error deleting item:', error);
        return res.status(500).send({
            ok: false,
            error: 'An error occurred while deleting the item.'
        });
    }
});

module.exports = router;
