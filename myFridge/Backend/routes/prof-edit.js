const express = require('express');
const router = express.Router();

const database = require('../shared/database');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
const multer = require('multer');
const upload = multer();
require('dotenv').config({ path: __dirname + '../../../.env' });

router.get('/', async (req, res, next) => {
    const tokenInput = req.headers.authorization;
    var user_id = req.query.user_id
    console.log(user_id);
    console.log("Request Auth Info from data edit: ", tokenInput);
    var tokenContent = tokenInput.split(" ")[1];

    jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
        if (err) {
            return res.status(401).send({
                ok: false, error: 'Unauthorized Request'
            });
        }

        try {
            const userData = await database.executeQuery({
                query: 'SELECT user_id, email, display_name, username AS userData FROM user_info WHERE user_id = ?',
                values: [data.user_id]
            });
            console.log(data.user_id)

            if ('error' in userData) {
                return res.status(500).send({
                    ok: false, error: userData.error.userError
                });
            }

            if (userData.length === 0) {
                return res.status(404).send({
                    ok: false, error: 'Data not found'
                });
            }

            return res.json({
                ok: true,
                data: userData[0],
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

router.put('/', upload.none(), async (req, res, next) => {
    const tokenInput = req.headers.authorization;
    const updatedData = req.body;

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
            const updateResult = await database.executeQuery({
                query: 'UPDATE user_info SET email = ?, display_name = ?, username = ? WHERE user_id = ?',
                values: [updatedData.email, updatedData.display_name, updatedData.username, data.user_id]
            });
            console.log(updatedData.email, updatedData.display_name, updatedData.username, data.user_id)

            if ('error' in updateResult) {
                return res.status(500).send({
                    ok: false, error: updateResult.error.userError
                });
            }

            if (updateResult.affectedRows === 0) {
                return res.status(404).send({
                    ok: false, error: 'Data not found'
                });
            }

            return res.json({
                ok: true,
                message: 'Data updated successfully',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({
                ok: false, error: 'Internal Server Error'
            });
        }
    });
})

module.exports = router;
