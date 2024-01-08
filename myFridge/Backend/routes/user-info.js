const express = require('express');
const router = express.Router();

const database = require('../shared/database');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
require('dotenv').config({ path: __dirname + '../../../.env' });

// Function to fetch the item count for a user based on their token
const fetchUserData = async (token, res) => {
    try {
        const tokenContent = token.split(" ")[1];

        jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
            if (err) {
                return res.status(401).send({
                    ok: false, error: 'Unauthorized Request'
                });
            }

            console.log(data.user_id);

            const userData = await database.executeQuery({
                query: 'SELECT user_id, email, display_name, username AS userData FROM user_info WHERE user_id = ?',
                values: [data.user_id]
            });

            if ('error' in userData) {
                return res.status(500).send({
                    ok: false,
                    error: userData.error.userError
                });
            }

            console.log(userData);

            const expireData = await database.executeQuery({
                query: 'SELECT display_name AS userData FROM user_info WHERE user_id = ?',
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
                userData: userData[0],
                expireData: expireData[0],
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

    // Call the fetchuserData function to fetch the item count
    fetchUserData(tokenInput, res);
});

// router.put('/', upload.none(), async (req, res, next) => {
//     const tokenInput = req.headers.authorization;
//     const updatedData = req.body; // Updated item data sent by the user

//     console.log("Request Auth Info: ", tokenInput);
//     var tokenContent = tokenInput.split(" ")[1];

//     console.log('updatedData : ',req.body)

//     jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
//         if (err) {
//             return res.status(401).send({
//                 ok: false, error: 'Unauthorized Request'
//             });
//         }

//         console.log(data.user_id);

//         try {
//             const updateResult = await database.executeQuery({
//                 query: 'UPDATE user_info SET email = ?, display_name = ?, username = ? WHERE user_id = ?',
//                 values: [updatedData.email, updatedData.display_name, updatedData.username, data.user_id]
//             });
//             console.log(updatedData.email, updatedData.display_name, updatedData.username, data.user_id)

//             if ('error' in updateResult) {
//                 return res.status(500).send({
//                     ok: false, error: updateResult.error.userError
//                 });
//             }

//             if (updateResult.affectedRows === 0) {
//                 return res.status(404).send({
//                     ok: false, error: 'Item not found'
//                 });
//             }

//             return res.json({
//                 ok: true,
//                 message: 'Item updated successfully',
//             });
//         } catch (error) {
//             console.error(error);
//             return res.status(500).send({
//                 ok: false, error: 'Internal Server Error'
//             });
//         }
//     });
// })

module.exports = router;