const express = require('express');
const router = express.Router();

const database = require('../shared/database');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: __dirname + '../../../.env' });

router.post('/', async (req, res, next) => {
    const { email, feedback } = req.body; // Assuming you receive 'email' and 'feedback' in the request body

    try {
        const tokenInput = req.headers.authorization;
        console.log("Request Auth Info: ", tokenInput);
        var tokenContent = tokenInput.split(" ")[1];
        console.log("feedback request : ", req.body)
        jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
            if (err) {
                return res.status(401).send({
                    ok: false,
                    error: 'Unauthorized Request'
                });
            }
            const userId = data.user_id;

            // Insert the new email and feedback into the database.
            const feedbackData = await database.executeQuery({
                query: 'INSERT INTO feedbacks(user_id, email, feedback) VALUES (?, ?, ?)',
                values: [userId, email, feedback]
            });

            if ('error' in feedbackData) {
                return res.status(500).send({
                    ok: false,
                    error: feedbackData.error.userError
                });
            }

            return res.status(200).send({
                ok: true,
                message: 'Feedback submitted successfully'
            });
        });
    } catch (e) {
        console.log("Some Error going on...");
        console.error(e);
        res.sendStatus(500);
    }
});

module.exports = router;
