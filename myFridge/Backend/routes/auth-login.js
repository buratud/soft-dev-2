const express = require('express');
const bcrypt = require('bcrypt');

const database = require('../shared/database');

const redis = require('redis')
const jwt = require('jsonwebtoken')

require('dotenv').config({ path: './env' });

const router = express.Router();
var CryptoJS = require("crypto-js");

const redisClient = redis.createClient()  
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

router.get('/', async (req, res, next) => {
    try {
        // console.log("Sign secret : ",process.env.JWT_SIGN_SECRET)
        const auth = req.headers.authorization;
        const decode = atob(auth.slice(5));
        const credentials = decode.split(":");
        console.log(credentials);
        const userId = credentials[0].trim();
        const password = CryptoJS.AES.decrypt(credentials[1],credentials[0]).toString(CryptoJS.enc.Utf8);
        // console.log(process.env.SECRET_AES_KEY)
        console.log(`userID : ${userId} , password : ${password.toString()}`);

        // get user data from database
        const userData = await database.executeQuery({
            query: 'SELECT * FROM user_info WHERE email = ? or username = ?',
            values: [userId, userId]
        });
        
        // console.log("secret : ",process.env.JWT_SIGN_SECRET)
        // console.log("web : ",process.env.NEXT_PUBLIC_API_URL)
        // console.log("dir : ",__dirname)

        if (userData.length == 0) {
            return res.status(404).send({
                ok: false,
                error: 'user not found'
            });
        }

        // check if password is matched from user input & database
        const match = await bcrypt.compare(password, userData[0].password);
        if (match) {
            // remove key from object
            delete userData[0].password;
            var userSigned = jwt.sign(JSON.stringify(userData[0]),process.env.JWT_SIGN_SECRET)
            console.log(userSigned)
            ;(await redisClient).set(userId,userSigned)
            // set user session & send result as success
            req.session.userData = userData[0];
            return res.status(200).send({
                ok: true,
                token : userSigned,
                message: 'Successfully Login!'
            });
        }

        // destroy any session & send result as fail
        req.session.destroy();
        return res.status(401).send({
            ok: false,
            error: 'Password incorect, Please try again later!'
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;