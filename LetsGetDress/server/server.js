require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
const { networkInterfaces } = require('os');
const sessionstorage = require('sessionstorage');
// const localStorage = require('local-storage');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

const app = express();
app.use(cors());
app.use(express.json()); //แปลงเป็น object

const jwt = require('jsonwebtoken');
const token_obj = 'this is token'
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MYMAIL,
        pass: process.env.MYPASS
    }
});

let omise = require('omise')({
    'publicKey': process.env.publicKey,
    'secretKey': process.env.secretKey,
});

const { error, log } = require('console');

//MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lets_get_dress'
})

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL database =', err)
        return;
    }
    console.log('MySQL successfully connected!');
})

//----------------------------Test--------------------------------------//
app.get("/test", (req, res) => {
    console.log("REQUEST GET");
    res.status(200).json({ message: "SERVER OKAY" })
})

//----------------------------Sign up--------------------------------------//

//for sign up
app.post("/sign_up", async (req, res) => {
    const { email, password, confirm } = req.body;
    try {
        connection.query(
            "SELECT * FROM account WHERE ACCOUNT_EMAIL = ?",
            [email], //แทน ?

            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.map(item => item.ACCOUNT_EMAIL).toString() === email) {
                    return res.status(400).json({ status: "fail", message: "This email already has an account" });
                }
                // ตรวจสอบรหัสที่สร้างว่าเหมือนกันมั้ย
                if (password !== confirm) {
                    return res.status(400).json({ status: "fail", message: "Password must be the same" });
                }
                sessionstorage.setItem('email', email);
                sessionstorage.setItem('password', password);
                res.status(200).json({ status: "success", message: "You can create new account with this email" });
            }
        )
    }

    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------Fill information--------------------------------------//

//for fill your information
app.post("/fill_information", async (req, res) => {
    const { weight, height, shoulder, bust, waist, hip, email, password } = req.body
    // const { weight, height, shoulder, bust, waist, hip } = req.body

    // const email = sessionstorage.getItem('email');
    // const password = sessionstorage.getItem('password');

    var figure = 'none'
    if (shoulder - hip > 3) { figure = 'inverted_tri' }
    else if (shoulder - hip < -3) { figure = 'pear' }
    else if (hip - waist < 0) { figure = 'apple' }
    else if (bust - waist > 18 || hip - waist > 23) { figure = 'hourglass' }
    else if (shoulder - hip < 3 && shoulder - hip > -3) { figure = 'rectangle' }

    try {
        // //ใส่ข้อมูลครบทุกอันมั้ย
        // if (weight.toString().length != 0 && height.toString().length != 0 && bust.toString().length != 0 && waist.toString().length != 0 && hip.toString().length != 0) {
        //ต้องกรอกแค่ตัวเลขเท่านั้น
        // if (Number.isFinite(Number(weight)) && Number.isFinite(Number(height)) && Number.isFinite(Number(bust)) && Number.isFinite(Number(waist)) && Number.isFinite(Number(hip))) {
        connection.query(
            //เพิ่มข้อมูลลง db
            "INSERT INTO account(`ACCOUNT_EMAIL`, `ACCOUNT_PASSWORD`, `WEIGHT`, `HEIGHT`, `SHOULDER`, `BUST`, `WAIST`, `HIP`, `FIGURE`) VALUES (?,?,?,?,?,?,?,?,?)", //insert ข้อมูล
            [email, password, weight, height, shoulder, bust, waist, hip, figure],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while updating an information of the database", err);
                    return res.status(400).json({ status: "fail", message: "Error while updating an information of the database" });
                }
                connection.query(
                    "SELECT * FROM account WHERE ACCOUNT_EMAIL = ?",
                    [email], //แทน ?
                    (err, outcome, fields) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send();
                        }
                        sessionstorage.setItem('id', outcome[0].ACCOUNT_ID);
                    })
                return res.status(200).json({ status: "success", message: "Sign up successfully!" })
            }
        )
        // }
        // return res.status(400).json({status:"fail", message: "ํTheese information should only be numbers"})
        // }
        // return res.status(400).json({status:"fail", message: "You need to fill all informations"})
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------Login--------------------------------------//

//for login
app.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        connection.query(
            "SELECT * FROM admin WHERE USERNAME = ? ", //ดึงข้อมูล
            [email],
            (err, admin, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                // ไม่ใช่แอดมิน
                if (admin.length === 0) {
                    connection.query(
                        "SELECT * FROM account WHERE ACCOUNT_EMAIL = ? ", //ดึงข้อมูล
                        [email],
                        (err, results, fields) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send();
                            }

                            //เช้คว่ามีอีเมลนี้ใน db มั้ย
                            if (results.length === 0) {
                                return res.status(400).json({ status: "fail", message: "No account with this email" });
                            }
                            //เช้คว่า email&password ถูกมั้ย
                            if (results[0].ACCOUNT_PASSWORD != password) {
                                return res.status(400).json({ status: "fail", message: "Email or Password is incorrect" });
                            }
                            // sessionstorage.setItem('email', email);
                            // sessionstorage.setItem('id', results[0].ACCOUNT_ID);
                            // sessionstorage.setItem('is_premium', results[0].IS_PREMIUM);

                            connection.query(
                                "SELECT * FROM account JOIN premium ON account.ACCOUNT_ID = premium.ACCOUNT_ID WHERE account.ACCOUNT_ID = ?",
                                [results[0].ACCOUNT_ID],
                                (err, premium, fields) => {
                                    if (err) {
                                        console.log(err);
                                        return res.status(400).send();
                                    }
                                    // เคยสมัคร premium
                                    if (premium.length !== 0){
                                        //premium หมดอายุ และยังต่อการจ่ายตัง
                                        if (new Date(premium[0].NEXT_BILL_DATE) < new Date() && premium[0].STATUS === 1){
                                            var expiration = premium[0].EXPIRE_DATE.split("-")
                                            let cardDetails = {
                                                card: {
                                                    'name': premium[0].CARD_HOLDER,
                                                    // 'city':             'Bangkok',
                                                    // 'postal_code':      10320,
                                                    'number': premium[0].CARD_NUM,
                                                    'expiration_month': expiration[1],
                                                    'expiration_year': expiration[0],
                                                },
                                            };

                                            var save_date = expiration[1] + '-' + expiration[0] + '-' + '01'

                                            //update history
                                            connection.query(
                                                "INSERT INTO history(`ACCOUNT_ID`, `bill_date`) VALUES (?,CURRENT_DATE)",
                                                [premium[0].ACCOUNT_ID],
                                                (err, results, fields) => {
                                                    if (err) {
                                                        console.log(err);
                                                        return res.status(400).send();
                                                    }
                                                }
                                            )

                                            //อัพเดต IS_PREMIUM, status
                                            connection.query(
                                                "UPDATE premium JOIN account ON account.ACCOUNT_ID = premium.ACCOUNT_ID  SET premium.STATUS = 1, account.IS_PREMIUM = 1 WHERE account.ACCOUNT_ID = ?",
                                                [premium[0].ACCOUNT_ID],
                                                (err, results, fields) => {
                                                    if (err) {
                                                        console.log(err);
                                                        return res.status(400).send();
                                                    }
                                                }
                                            )
                                            //การจ่ายเงิน
                                            //Omise: Auto capture a charge
                                            omise.tokens.create(cardDetails).then(function (token) {
                                                console.log(token);
                                                return omise.customers.create({
                                                    'email': premium[0].ACCOUNT_EMAIL,
                                                    'description': 'account id: ' + premium[0].ACCOUNT_ID,
                                                    'card': token.id,
                                                });
                                            }).then(function (customer) {
                                                console.log(customer);
                                                return omise.charges.create({
                                                    'amount': 10000,
                                                    'currency': 'thb',
                                                    'customer': customer.id,
                                                });
                                            }).then(function (charge) {
                                                console.log(charge);
                                            }).catch(function (err) {
                                                console.log(err);
                                            }).finally();

                                            //ส่งเมลยืนยันการสมัคร premium
                                            const text_sending = {
                                                from: process.env.MYMAIL,
                                                to: premium[0].ACCOUNT_EMAIL,
                                                subject: 'Thank you for your subscription to Orange premium',
                                                text: "Dear User :\n\nThank you for your subscription to Orange premium! We've successfully processed your payment of 35.00฿\n\nIf you've any further questions please visit our Question and concern.\n\nRegards,\nOrange Team"
                                            };

                                            transporter.sendMail(text_sending, (err, info) => {
                                                if (err) {
                                                    console.log(err);
                                                    return res.status(400).send();
                                                }
                                            })
                                        }
                                        //premium หมดอายุ และไม่ต่อบัตร
                                        else if (new Date(premium[0].NEXT_BILL_DATE) < new Date() && premium[0].STATUS === 0){
                                            connection.query(
                                                //อัพเดตข้อมูลใน db ยกเลิก IS_PREMIUM
                                                "UPDATE account SET IS_PREMIUM = 0 WHERE ACCOUNT_ID = ?",
                                                [premium[0].ACCOUNT_ID], //แทน ?
                                                (err, results, fields) => {
                                                    if (err) {
                                                        console.log("Error while inserting a user into the database", err);
                                                        return res.status(400).send();
                                                    }
                                                }
                                            )
                                        }
                                    }
                                })

                            //ส่ง OTP ไปที่ email
                            const OTP = Math.floor(Math.random() * (9999 - 1000)) + 1000
                            const token = jwt.sign({ OTP: OTP }, token_obj, { expiresIn: '10m' });

                            console.log(OTP)
                            sessionstorage.setItem('token', token);
                            const text_sending = {
                                from: process.env.MYMAIL,
                                to: email,
                                subject: 'OTP verification on Orange',
                                text: "Dear User :\n\nThank you for coming back to our app. Please use this OTP to complete your Login procedures on Orange. Do not share this OTP to anyone.\n\n" + OTP + "\n\nRegards,\nOrange Team"
                            };

                            transporter.sendMail(text_sending, (err, info) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(400).send();
                                }
                            });

                            connection.query(
                                "SELECT * FROM account WHERE ACCOUNT_EMAIL = ? ", //ดึงข้อมูล
                                [email],
                                (err, result, fields) => {
                                    if (err) {
                                        console.log(err);
                                        return res.status(400).send();
                                    }
                                    return res.status(200).json({ status: "user success", message: "can go to Verify Email", results: result, token: token});
                                })
                                
                            // fetch('http://192.168.167.90:3360/send_login_OTP', {
                            //     method: 'POST',
                            //     body: {
                            //         email: email
                            //     }
                            // })
                            //     .then(res => res.json())
                            //     .then(outcome => {
                            //         return res.status(200).json({ status: "user success", message: "can go to Verify Email", results: results, token: outcome.token });
                            //     })
                        })
                }
                //เช้คว่า password ถูกมั้ย
                else if (admin[0].PASSWORD != password) {
                        return res.status(400).json({ status: "fail", message: "username or Password is incorrect" });
                }
                else {
                return res.status(200).json({ status: "admin success", message: "Admin login successfully!" });
                }
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

// ปุ่ม forgot password
app.post("/forgot_password", async (req, res) => {
    const email = req.body.email;
    // const email = sessionstorage.getItem('email');
    
    try {
        connection.query(
            "SELECT * FROM account WHERE ACCOUNT_EMAIL = ?",
            [email],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                //เช้คว่ามีอีเมลนี้ใน db มั้ย
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "No account with this email" });
                }
                sessionstorage.setItem('id', results[0].ACCOUNT_ID);
                //ส่ง OTP ไปที่ email
                const OTP = Math.floor(Math.random() * (9999 - 1000)) + 1000
                const token = jwt.sign({ OTP: OTP }, token_obj, { expiresIn: '10m' });
        
                console.log(OTP)
                sessionstorage.setItem('token', token);
        
                const text_sending = {
                    from: process.env.MYMAIL,
                    to: email,
                    subject: 'OTP verification to reset password on Orange',
                    text: "Dear User :\n\nA request has been received to change the password for your Orange account. Please use this OTP to reset your password. Do not share this OTP to anyone.\n\n" + OTP + "\n\nIf you did not initiate this request, please contact us immediately at our Question and concern.\n\nRegards,\nOrange Team"
                };
        
                transporter.sendMail(text_sending, (err, info) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send();
                    }
                });

                res.status(200).json({ status: "success", message: "can go to Verify reset password code overlay", token: token });
                // fetch('http://192.168.167.90:3360/send_password_OTP/' + new URLSearchParams(email), {
                //     method: 'GET',
                // })
                //     .then(res => res.json())
                //     .then(outcome => {
                //         res.status(200).json({ status: "success", message: "can go to Verify reset password code overlay", token: outcome.token });
                //     })
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------Verify Email--------------------------------------//

//send otp / for resend otp
app.post("/send_login_OTP", async (req, res) => {
    // const email = sessionstorage.getItem('email');
    const email = req.body.email;
    try {
        const OTP = Math.floor(Math.random() * (9999 - 1000)) + 2000
        const token = jwt.sign({ OTP: OTP }, token_obj, { expiresIn: '10m' });

        console.log(OTP)
        sessionstorage.setItem('token', token);

        const text_sending = {
            from: process.env.MYMAIL,
            to: email,
            subject: 'OTP verification on Orange',
            text: "Dear User :\n\nThank you for coming back to our app. Please use this OTP to complete your Login procedures on Orange. Do not share this OTP to anyone.\n\n" + OTP + "\n\nRegards,\nOrange Team"
        };

        transporter.sendMail(text_sending, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
        });

        return res.status(200).json({ token: token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//to check OTP
app.post("/verify_OTP", async (req, res) => {
    const user_OTP = parseInt(req.body.user_OTP)
    // const token = sessionstorage.getItem('token');
    const token = req.body.token

    try {
        const payloadBase64 = token.split('.')[1];
        const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
        const decoded = JSON.parse(decodedJson)
        const isTokenExpired = (Date.now() >= decoded.exp * 2000)

        //ยังไม่หมดอายุ
        if (isTokenExpired === false) {
            const decode = jwt.verify(token, token_obj);
            if (decode.OTP === user_OTP) {
                connection.query(
                    "SELECT * FROM account WHERE ACCOUNT_EMAIL = ?",
                    [sessionstorage.getItem('email')], //แทน ?
                    (err, outcome, fields) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send();
                        }
                        // sessionstorage.setItem('id', outcome[0].ACCOUNT_ID);
                    })
                return res.status(200).json({ status: "success", message: "OTP is correct" });
            }
            return res.status(400).json({ status: "fail", message: "OTP is incorrect" });
        }
        //หมดอายุแล้ว
        res.status(400).json({ status: "fail", message: "OTP is expired" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------Reset password--------------------------------------//

//for reset password
app.post("/reset_password", async (req, res) => {
    const { password, confirm } = req.body
    // const id = sessionstorage.getItem('id');
    const id = req.body.id

    try {
        //เช้คว่า password ตรงกันมั้ย
        if (confirm !== password) {
            return res.status(400).json({ status: "fail", message: "Password must be the same" });
        }

        connection.query(
            //อัพเดตข้อมูลใน db
            "UPDATE account SET ACCOUNT_PASSWORD = ? WHERE ACCOUNT_ID = ?",
            [password, id], //แทน ?
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ status: "success", message: "New password successfully update!" });
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------Verify reset password code--------------------------------------//

//send otp / for resend otp
app.get("/send_password_OTP/:email", async (req, res) => {
    // const email = sessionstorage.getItem('email');
    const email = req.body.email

    try {
        const OTP = Math.floor(Math.random() * (9999 - 1000)) + 1000
        const token = jwt.sign({ OTP: OTP }, token_obj, { expiresIn: '10m' });

        console.log(OTP)
        sessionstorage.setItem('token', token);

        const text_sending = {
            from: process.env.MYMAIL,
            to: email,
            subject: 'OTP verification to reset password on Orange',
            text: "Dear User :\n\nA request has been received to change the password for your Orange account. Please use this OTP to reset your password. Do not share this OTP to anyone.\n\n" + OTP + "\n\nIf you did not initiate this request, please contact us immediately at our Question and concern.\n\nRegards,\nOrange Team"
        };

        transporter.sendMail(text_sending, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
        });

        return res.status(200).json({ token: token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------See New Fashion--------------------------------------//

//for new fashion with model
app.post("/new_fashion", async (req, res) => {
    try {
        connection.query(
            //ดึงข้อมูลของ content มา
            "SELECT * FROM fashion ORDER by FASHION_ID DESC LIMIT 20",
            (err, results, fields) => {
                if (err) {
                    console.log("Error while connecting to the database", err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "No content available" });
                }
                res.status(200).json({ status: "success", message: results });
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//for new clothes
app.get("/new_clothes", async (req, res) => {
    try {
        connection.query(
            //ดึงข้อมูลของ content มา
            "SELECT * FROM clothes ORDER by CLOTHES_ID DESC LIMIT 8",
            (err, results, fields) => {
                if (err) {
                    console.log("Error while connecting to the database", err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "No content available" });
                }
                res.status(200).json({ status: "success", message: results });
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------See New Content--------------------------------------//

//for new content
app.get("/new_content", async (req, res) => {
    try {
        connection.query(
            //ดึงข้อมูลของ content มา
            "SELECT * FROM content ORDER by CONTENT_ID DESC LIMIT 30",
            (err, results, fields) => {
                if (err) {
                    console.log("Error while connecting to the database", err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "No content available" });
                }
                res.status(200).json({ status: "success", message: results });
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------See profile--------------------------------------//

//for see profile IS_PREMIUM ไว้บอกว่าตอนนี้บัญชีนั้นอยู่ในเวอร์ชั่นอะไร 0 = user ปกติ 1 = premium
app.post("/profile", async (req, res) => {
    // const id = sessionstorage.getItem('id');
    const id = req.body.id
    try {
        connection.query(
            //ดึงข้อมูลของแอคเค้ามา
            "SELECT * FROM account WHERE ACCOUNT_ID = ?",
            [id],
            (err, results, fields) => {
                if (err) {
                    console.log("Error while connecting to the database", err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "Error, Can't find this id in the database" });
                }
                res.status(200).json({ status: "success", results: results });
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//upgrade to premium
app.post("/upgrade_premium", async (req, res) => {
    const { card_num, expire_date, cvv, holder } = req.body

    // const id = sessionstorage.getItem('id')
    const id = req.body.id

    var expiration = expire_date.split("/")
    let cardDetails = {
        card: {
            'name': holder,
            // 'city':             'Bangkok',
            // 'postal_code':      10320,
            'number': card_num,
            'expiration_month': expiration[0],
            'expiration_year': expiration[1],
        },
    };

    var save_date = expiration[1] + '-' + expiration[0] + '-' + '01'

    try {
        // หาอีเมล
        connection.query(
            "SELECT * FROM account JOIN premium ON account.ACCOUNT_ID = premium.ACCOUNT_ID WHERE account.ACCOUNT_ID = ?",
            [id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }

                //ตาราง premium
                if (results.length === 0) {
                    //ยังไม่เคยสมัคร premium มาก่อน
                    connection.query(
                        "INSERT INTO premium(ACCOUNT_ID, CARD_NUM, EXPIRE_DATE, CVV, CARD_HOLDER, NEXT_BILL_DATE) VALUES(?,?,?,?,?, DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 28 DAY))",
                        [id, card_num, save_date, cvv, holder],
                        (err, results, fields) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send();
                            }
                        }
                    )
                }
                else {
                    //เคยสมัคร premium แล้ว
                    connection.query(
                        "UPDATE premium JOIN account SET premium.STATUS = 1, premium.CARD_NUM = ?, premium.EXPIRE_DATE = ?, premium.CVV = ?, premium.CARD_HOLDER = ?, premium.NEXT_BILL_DATE = DATE_ADD(CURRENT_DATE(), INTERVAL 28 DAY) WHERE account.ACCOUNT_ID = premium.ACCOUNT_ID AND account.ACCOUNT_ID = ?",
                        [card_num, save_date, cvv, holder, id],
                        (err, results, fields) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send();
                            }
                        }
                    )
                }

                //อัพเดต IS_PREMIUM, status
                connection.query(
                    "UPDATE premium JOIN account ON account.ACCOUNT_ID = premium.ACCOUNT_ID  SET premium.STATUS = 1, account.IS_PREMIUM = 1 WHERE account.ACCOUNT_ID = ?",
                    [id],
                    (err, results, fields) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send();
                        }
                    }
                )

                //จ่ายเมื่อหมดอายุแล้วเท่านั้น
                if (new Date(results[0].NEXT_BILL_DATE) < new Date() && results[0].STATUS === 1){
                    //update history
                    connection.query(
                        "INSERT INTO history(`ACCOUNT_ID`, `bill_date`) VALUES (?,CURRENT_DATE)",
                        [id],
                        (err, results, fields) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send();
                            }
                        }
                    )
                    
                    //การจ่ายเงิน
                    connection.query(
                        "SELECT * FROM account WHERE ACCOUNT_ID = ?",
                        [id],
                        (err, payment, fields) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send();
                            }

                            //Omise: Auto capture a charge
                            omise.tokens.create(cardDetails).then(function (token) {
                                console.log(token);
                                return omise.customers.create({
                                    'email': payment[0].ACCOUNT_EMAIL,
                                    'description': 'account id: ' + payment[0].ACCOUNT_ID,
                                    'card': token.id,
                                });
                            }).then(function (customer) {
                                console.log(customer);
                                return omise.charges.create({
                                    'amount': 10000,
                                    'currency': 'thb',
                                    'customer': customer.id,
                                });
                            }).then(function (charge) {
                                console.log(charge);
                            }).catch(function (err) {
                                console.log(err);
                            }).finally();

                            //ส่งเมลยืนยันการสมัคร premium
                            const text_sending = {
                                from: process.env.MYMAIL,
                                to: payment[0].ACCOUNT_EMAIL,
                                subject: 'Thank you for your subscription to Orange premium',
                                text: "Dear User :\n\nThank you for your subscription to Orange premium! We've successfully processed your payment of 35.00฿\n\nIf you've any further questions please visit our Question and concern.\n\nRegards,\nOrange Team"
                            };

                            transporter.sendMail(text_sending, (err, info) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(400).send();
                                }
                            });
                        })
                }
                return res.status(200).json({ status: "success", message: "Upgrade to premium successfully!" })
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------Edit profile--------------------------------------//

//for edit profile รวมทั้ง premium และปกติ email = เดิม newemail = email ใหม่
app.post("/edit_profile", async (req, res) => {
    // const { weight, height, shoulder, bust, waist, hip } = req.body
    const { weight, height, shoulder, bust, waist, hip, id } = req.body
    // const id = sessionstorage.getItem("id")

    var figure = 'none'
    if (shoulder - hip > 3) { figure = 'inverted_tri' }
    else if (shoulder - hip < -3) { figure = 'pear' }
    else if (hip - waist < 0) { figure = 'apple' }
    else if (bust - waist > 18 || hip - waist > 23) { figure = 'hourglass' }
    else if (shoulder - hip < 3 && shoulder - hip > -3) { figure = 'rectangle' }

    try {
        connection.query(
            "UPDATE account SET WEIGHT = ?, HEIGHT = ?, SHOULDER = ?, BUST = ?, WAIST = ?, HIP = ?, FIGURE = ? WHERE ACCOUNT_ID = ?",
            [weight, height, shoulder, bust, waist, hip, figure, id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
            })
        return res.status(200).json({ status: "success", message: "Profile updated successfully!" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------Payment Detail--------------------------------------//

//for payment detail payment method, next bill date
app.post("/payment_detail", async (req, res) => {
    // const id = sessionstorage.getItem('id')
    const id = req.body.id
    try {
        connection.query(
            "SELECT premium.CARD_NUM, premium.STATUS, DATE_FORMAT(premium.NEXT_BILL_DATE, '%d %M %Y') AS NEXT_BILL_DATE, DATE_FORMAT(history.BILL_DATE, '%d %M %Y') AS BILL_DATE FROM account JOIN premium ON account.ACCOUNT_ID = premium.ACCOUNT_ID JOIN history ON account.ACCOUNT_ID = history.ACCOUNT_ID WHERE account.ACCOUNT_ID = ?",
            // "SELECT premium.CARD_NUM, premium.STATUS, DATE_FORMAT(premium.NEXT_BILL_DATE, '%d %M %Y') AS NEXT_BILL_DATE FROM account JOIN premium ON account.ACCOUNT_ID = premium.ACCOUNT_ID WHERE account.ACCOUNT_ID = ?",
            [id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "Error, Can't find this id in the database" });
                }
                return res.status(200).json({ message: "Get information successfully!", results: results[0], history: results, status: "success"});
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//for payment detail history
app.get("/payment_history", async (req, res) => {
    const id = sessionstorage.getItem('id');

    try {
        connection.query(
            "SELECT DATE_FORMAT(history.bill_date, '%d %M %Y') AS BILL_DATE FROM account JOIN premium ON account.ACCOUNT_ID = premium.ACCOUNT_ID JOIN history ON account.ACCOUNT_ID = history.ACCOUNT_ID AND account.ACCOUNT_ID = ? ORDER BY HISTORY_ID DESC LIMIT 5",
            // SELECT premium.CARD_NUM, premium.EXPIRE_DATE, premium.CVV, premium.CARD_HOLDER, DATE_FORMAT(premium.NEXT_BILL_DATE, '%d %M %Y') AS NEXT_BILL_DATE, history.bill_date FROM account JOIN premium ON account.ACCOUNT_ID = premium.ACCOUNT_ID JOIN history ON account.ACCOUNT_ID = history.ACCOUNT_ID WHERE account.ACCOUNT_ID = 1 ORDER BY history.HISTORY_ID DESC LIMIT 20
            [id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "Error, Can't find this id in the database" });
                }
                return res.status(200).json({ status: "success", message: "Get information successfully!", results: results })
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//เปลี่ยนเลขบัตร
app.patch("/change_method", async (req, res) => {
    const { card_num, expire_date, cvv, holder } = req.body
    const id = sessionstorage.getItem('id');

    try {
        connection.query(
            "UPDATE account JOIN premium SET premium.CARD_NUM = ?, premium.EXPIRE_DATE = ?, premium.CVV = ?, premium.CARD_HOLDER = ? WHERE account.ACCOUNT_ID = premium.ACCOUNT_ID AND account.ACCOUNT_ID = ?",
            [card_num, expire_date, cvv, holder, id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
            }
        )
        return res.status(200).json({ status: "success", message: "Change credit card number successfully!" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------Cancel Premium--------------------------------------//

//for cancel premium overlay confirm = คำตอบของ Are you sure to cancel Premium? yes/no
app.post("/cancel_premium", async (req, res) => {
    const confirm = req.body.confirm
    const id = req.body.id
    // const id = sessionstorage.getItem("id")

    try {
        if (confirm == "yes") {
            connection.query(
                "UPDATE premium JOIN account SET STATUS = 0 WHERE account.ACCOUNT_ID = premium.ACCOUNT_ID AND account.ACCOUNT_ID = ?",
                [id],
                (err, results, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send();
                    }

                    //ส่งเมลแจ้งว่ายกเลิกการสมัคร premium แล้ว
                    connection.query(
                        "SELECT ACCOUNT_EMAIL FROM account WHERE ACCOUNT_ID = ?",
                        [id],
                        (err, results, fields) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send();
                            }
                            const text_sending = {
                                from: process.env.MYMAIL,
                                to: results[0].ACCOUNT_EMAIL,
                                subject: 'Cancelation of Orange premium',
                                text: "Dear User :\n\nSorry to see you've cancelled your Orange premium.\n\nIf you're having second thoughts, we'll welcome you back any time.\n\nRegards,\nOrange Team"
                            };

                            transporter.sendMail(text_sending, (err, info) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(400).send();
                                }
                            });
                        })
                }
            )
            return res.status(200).json({ status: "success", message: "Cancel premium successfully!" })
        }
        res.status(400).json({ status: "fail", message: "Doesn't cancel premium yet" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------Outfit Recommendation--------------------------------------//

//for showing place selection
app.get("/place", async (req, res) => {
    try {
        connection.query(
            "SELECT * FROM place",
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "Error, Can't find any place selection" });
                }
                return res.status(200).json({ status: "success", message: "Get information successfully!", results: results })
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//for showing theme selection
app.get("/theme", async (req, res) => {
    try {
        connection.query(
            "SELECT CHOICE FROM theme",
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "Error, Can't find any theme selection" });
                }
                return res.status(200).json({ status: "success", message: "Get information successfully!", results: results })
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------See recommendation--------------------------------------//

//for Outfit Recommendation
app.post("/recommend", async (req, res) => {
    var { id, theme, place } = req.body

    if (theme == 'DARK') {
        theme = "DARK' OR COLOR = 'BLACK"
    }

    if (theme == 'PASTEL') {
        theme = "PASTEL' OR COLOR = 'WHITE"
    }

    try {
        connection.query(
            "SELECT * FROM account WHERE ACCOUNT_ID = ?",
            [id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "Error while searching for this id" });
                }

                var figure = results[0].FIGURE
                connection.query(
                    "SELECT * FROM clothes WHERE " + figure + " = 1 AND (TYPE = 'TOP' OR TYPE = 'ONE') AND (TAG = '" + place + "') AND (COLOR = '" + theme + "')",
                    (err, results, fields) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send();
                        }
                        if (results.length === 0) {
                            return res.status(400).json({ status: "fail", message: "Error, Can't find any clothes for this figure" });
                        }
                        var pick = Math.floor(Math.random() * results.length)
                        const pair = results[pick].PAIR.split(",")
                        if (results[pick].TYPE == 'TOP') {
                            // var i = 0
                            // var found = 0
                            // while (found === 0 && i < pair.length) {
                                connection.query(
                                    "SELECT * FROM clothes WHERE " + figure + " = 1 AND TYPE = 'BOTTOM' AND (TAG = '" + place + "') AND (COLOR = '" + theme + "')",
                                    // "SELECT * FROM clothes WHERE " + figure + " = 1 AND TYPE = 'BOTTOM' AND (TAG = '" + place + "') AND (COLOR = '" + theme + "') AND CLOTHES_ID = ?",
                                    // [pair[i]],
                                    (err, outcome, fields) => {
                                        if (err) {
                                            console.log(err);
                                            return res.status(400).send();
                                        }
                                        if (outcome.length != 0) {
                                            // found = 1
                                            var pick_bottom = Math.floor(Math.random() * outcome.length)
                                            return res.status(200).json({ status: "success", message: "Select outfit successfully!", results: results[pick], results2: outcome[pick_bottom] });
                                        }
                                    }
                                )
                                // i = i + 1
                            // }
                        }
                        else {
                            return res.status(200).json({ status: "success", message: "Select outfit successfully!", results: results[pick] });
                        }
                    }
                )
            }
        )

    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})


//----------------------------Ask Question and concern--------------------------------------//

// // show question and concern's channel
// app.post("/show_channel", async (req, res) => {
//     // const id = sessionstorage.getItem('id')
//     const id = req.body.id

//     try {
//         connection.query(
//             "SELECT * FROM `concern` WHERE ACCOUNT_ID = ?",
//             [id],
//             (err, results, fields) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(400).send();
//                 }
//                 if (results.length === 0) {
//                     return res.status(400).json({ status: "fail", message: "There are no channels yet" });
//                 }
//                 return res.status(200).json({ status: "success", message: "Show channels successfully!", results: results });
//             }
//         )

//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).send();
//     }
// })

// // create new question and concern's channel
// app.post("/new_channel", async (req, res) => {
//     const text = req.body.text
//     // const id = req.body.id
//     const id = sessionstorage.getItem('id')

//     try {
//         connection.query(
//             "SELECT MAX(CHANNEL_ID) AS MAX_CHANNEL_ID FROM `concern` WHERE ACCOUNT_ID = ?",
//             [id],
//             (err, results, fields) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(400).send();
//                 }
//                 var channel = results[0].MAX_CHANNEL_ID + 1
//                 if (channel === null) {
//                     channel = 0
//                 }
//                 //เพิ่มข้อความใหม่ลงฐานข้อมูล
//                 connection.query(
//                     "INSERT INTO `concern`(`ACCOUNT_ID`, `CHANNEL_ID`, `TITLE`) VALUES (?,?,?)",
//                     [id, channel, text],
//                     (err, results, fields) => {
//                         if (err) {
//                             console.log(err);
//                             return res.status(400).send();
//                         }
//                         return res.status(200).json({ status: "success", message: "Creating new channel successfully!" })
//                     })
//             }
//         )

//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).send();
//     }
// })

// // show question and concern for each channel
// app.post("/show_concern", async (req, res) => {
//     const channel = req.body.channel
//     // const id = sessionstorage.getItem('id')
//     const id = req.body.id

//     try {
//         connection.query(
//             "SELECT * FROM `channel` WHERE CHANNEL_ID = ? AND ACCOUNT_ID = ?",
//             [channel, id],
//             (err, results, fields) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(400).send();
//                 }
//                 if (results.length === 0) {
//                     return res.status(400).json({ status: "fail", message: "There are no messages yet" });
//                 }
//                 return res.status(200).json({ status: "success", message: "Show each channel successfully!", results: results });
//             }
//         )

//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).send();
//     }
// })

// //for saving question and concern chat
// app.post("/save_concern", async (req, res) => {
//     const { text, channel, sender } = req.body
//     // const id = sessionstorage.getItem('id')
//     const id = req.body.id

//     try {
//         //ดึงข้อมูลล่าสุด
//         connection.query(
//             "SELECT MAX(CHAT_ID) AS MAX_CHAT_ID FROM `channel` WHERE CHANNEL_ID = ? AND ACCOUNT_ID = ?",
//             [channel, id],
//             (err, results, fields) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(400).send();
//                 }
//                 var chat = results[0].MAX_CHAT_ID + 1
//                 if (chat === null) {
//                     chat = 0
//                 }
//                 //เพิ่มข้อความใหม่ลงฐานข้อมูล
//                 connection.query(
//                     "INSERT INTO `channel`(`CHAT_ID`, `ACCOUNT_ID`, `CHANNEL_ID`, `TEXT`, `SENDER`) VALUES (?,?,?,?,?)",
//                     [chat, id, channel, text, sender],
//                     (err, results, fields) => {
//                         if (err) {
//                             console.log(err);
//                             return res.status(400).send();
//                         }
//                         return res.status(200).json({ status: "success", message: "Saving concern successfully!" })
//                     })
//             }
//         )

//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).send();
//     }
// })

//for question and concern
app.post("/new_question", async (req, res) => {
    const {title, body, id} = req.body

    try {
        //เก็บข้อความไว้ในฐานข้อมูล
        connection.query(
            "INSERT INTO question(`ACCOUNT_ID`, `TITLE`, `BODY`, `DATE`, `STATUS`) VALUES (?,?,?,CURRENT_DATE(),'on hold')",
            [id, title, body],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                //ส่งอีเมลตอบกลับว่าได้รับข้อความแล้ว
                connection.query(
                    "SELECT ACCOUNT_EMAIL FROM account WHERE ACCOUNT_ID = ?",
                    [id],
                    (err, results, fields) => {
                        if (err) {
                            console.log(err);
                            return res.status(400).send();
                        }

                        const text_sending = {
                            from: process.env.MYMAIL,
                            to: results[0].ACCOUNT_EMAIL,
                            subject: 'Thank you for your feedback to Orange',
                            text:"Dear User :\n\nThank you for taking time to contact Orange to explain the issues you have encountered recently. We regret any inconvenience you have experienced, and we assure you that we are anxious to retain you as a satisfied customer.\n\nOur Customer Satisfaction Team is reviewing the information you sent us and conducting a full investigation in order to resolve this matter fairly.\n\nSincerely,\nOrange Team"
                        };

                        transporter.sendMail(text_sending, (err, info) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send();
                            }
                            return res.status(200).json({status:"success", message : "Question and concern received successfully!"})
                        });
                    }
                )
            }
        )

    }
    catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// for showing question and concern
app.post("/show_question", async (req, res) => {
    const {id} = req.body

    try {
        connection.query(
            "SELECT `QUESTION_ID`, `TITLE`, `BODY`, DATE_FORMAT( `DATE`, '%d %M %Y') AS DATE, `STATUS` FROM `question` WHERE ACCOUNT_ID = ?",
            [id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json({status:"success", message : "Question and concern show successfully!", results: results})
            }
        )

    }
    catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// for showing question and concern detail
app.post("/question_detail", async (req, res) => {
    const id = req.body.id
    console.log(id)
    try {
        connection.query(
            "SELECT `TITLE`, `BODY`, DATE_FORMAT( `DATE`, '%d %M %Y') AS DATE, `STATUS` FROM `question` WHERE `QUESTION_ID` = ?",
            [id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                console.log(results)
                return res.status(200).json({status:"success", message : "Question and concern show successfully!", results: results})
            }
        )

    }
    catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})

// show question and concern to admin
app.get("/admins_question", async (req, res) => {
    // const {status} = req.body

    try {
        connection.query(
            "SELECT * FROM question ORDER BY QUESTION_ID DESC;",
            // [status],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json({status:"success", message : "Question and concern show successfully!", results: results})
            }
        )

    }
    catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})


// for admin to update question and concern
app.post("/update_question", async (req, res) => {
    const {status,id} = req.body

    try {
        connection.query(
            "UPDATE `question` SET `STATUS`= ? WHERE QUESTION_ID = ?",
            [status, id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json({status:"success", message : "Question and concern updated successfully!"})
            }
        )

    }
    catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})


//----------------------------update selection--------------------------------------//

//for admin to update place selection
app.post("/update_place", async (req, res) => {
    const {id,new_place} = req.body
    console.log(id,new_place)
    try {
        connection.query(
            "UPDATE `place` SET `CHOICE`= ? WHERE `PLACE_ID`= ?",
            // "INSERT INTO place(`CHOICE`) VALUES (?)", //ดึงข้อมูล
            [new_place,id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ status:"success" ,message: "update place successfully!" })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})

//for admin to update theme selection
app.post("/update_theme", async (req, res) => {
    const {id, new_theme} = req.body
    console.log(id, new_theme)
    try {
        connection.query(
            "UPDATE `theme` SET `CHOICE`= ? WHERE `THEME_ID`= ?",
            // "INSERT INTO theme(`CHOICE`) VALUES (?)", //ดึงข้อมูล
            [new_theme, id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "update theme successfully!" })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})

// //ลบ place
// app.delete("/delete_place", async (req, res) => {
//     const place = req.body.place;
//     try {
//         connection.query(
//             "DELETE FROM place WHERE CHOICE = ?", //ดึงข้อมูล
//             [place],
//             (err, results, fields) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(400).send();
//                 }
//                 if (results.affectedRow === 0) {
//                     return res.status(404).json({ message: "No such choice"})
//                 }
//                 res.status(200).json({ message: "place selection deleted successfully!"})
//             })
//     }
//     catch(err) {
//         console.log(err);
//         return res.status(500).send();
//     }

// })

//delete ตัวเลือกในหัวข้อ place
app.delete("/delete_place", async (req, res) => {
    const { confirm, choice } = req.body

    try {
        connection.query(
            "SELECT * FROM place WHERE CHOICE = ?",
            [choice],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }

                if (results.length == 0) {
                    return res.status(400).json({ status: "fail", message: "Can't find this choice id in the database" })
                }
                else {
                    if (confirm == "yes") {
                        connection.query(
                            "DELETE FROM place WHERE CHOICE = ?",
                            [choice],
                            (err, results, fields) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(400).send();
                                }
                            }
                        )
                        return res.status(200).json({ status: "success", message: "Delete choice successfully!" })
                    }
                    res.status(400).json({ status: "fail", message: "Doesn't delete choice yet" })
                }
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//delete ตัวเลือกในหัวข้อ theme
app.delete("/delete_theme", async (req, res) => {
    const { confirm, choice } = req.body

    try {
        connection.query(
            "SELECT * FROM place WHERE CHOICE = ?",
            [choice],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }

                if (results.length == 0) {
                    return res.status(400).json({ status: "fail", message: "Can't find this choice id in the database" })
                }
                else {
                    if (confirm == "yes") {
                        connection.query(
                            "DELETE FROM place WHERE CHOICE = ?",
                            [choice],
                            (err, results, fields) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(400).send();
                                }
                            }
                        )
                        return res.status(200).json({ status: "success", message: "Delete choice successfully!" })
                    }
                    res.status(400).json({ status: "fail", message: "Doesn't delete choice yet" })
                }
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

// //ลบ theme
// app.delete("/delete_theme", async (req, res) => {
//     const theme = req.body.theme;
//     try {
//         connection.query(
//             "DELETE FROM theme WHERE CHOICE = ?", //ดึงข้อมูล
//             [theme],
//             (err, results, fields) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(400).send();
//                 }
//                 if (results.affectedRow === 0) {
//                     return res.status(404).json({ message: "No such choice"})
//                 }
//                 res.status(200).json({ message: "theme selection deleted successfully!"})
//             })
//     }
//     catch(err) {
//         console.log(err);
//         return res.status(500).send();
//     }

// })

//----------------------------update clothes--------------------------------------//

//update clothes
app.post("/update_clothes", async (req, res) => {
    const { pic, place, theme, type, pair, inverted_tri, apple, pear, hourglass, rectangle } = req.body;
    try {
        connection.query(
            "INSERT INTO clothes(`PIC`, `TAG`, `COLOR`, `TYPE`, `PAIR`, `INVERTED_TRI`, `APPLE`, `PEAR`, `HOURGLASS`, `RECTANGLE`) VALUES (?,?,?,?,?,?,?,?,?,?)", //ดึงข้อมูล
            [pic, place, theme, type, pair, inverted_tri, apple, pear, hourglass, rectangle],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.affectedRow === 0) {
                    return res.status(404).json({ message: "Error, while inserting fashion to database" })
                }
                res.status(200).json({ message: "fashion updated successfully!" })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})

// //ลบ clothes
// app.delete("/delete_clothes", async (req, res) => {
//     const {id, confirm} = req.body;
//     try {
//         connection.query(
//             "SELECT * FROM clothes WHERE CLOTHES_ID = ?", //ดึงข้อมูล
//             [id],
//             (err, results, fields) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(400).send();
//                 }
//                 if (results.length === 0) {
//                     return res.status(404).json({ message: "No clothes with that id"})
//                 }

//                 if (confirm === 'yes') {
//                     connection.query(
//                         "DELETE FROM clothes WHERE CLOTHES_ID = ?", //ดึงข้อมูล
//                         [id],
//                         (err, results, fields) => {
//                             if (err) {
//                                 console.log(err);
//                                 return res.status(400).send();
//                             }
//                             if (results.affectedRow === 0) {
//                                 return res.status(404).json({ message: "Error, while deleting"})
//                             }
//                             res.status(200).json({ message: "clothes delete successfully!"})
//                         })
//                 }
//                 else {
//                     return res.status(404).json({ message: "Doesn't delete clothes yet"})
//                 }
//             })
//     }
//     catch(err) {
//         console.log(err);
//         return res.status(500).send();
//     }

// })

//----------------------------update fashion--------------------------------------//

//update fashion
app.post("/update_fashion", async (req, res) => {
    const { pic, title, id } = req.body;
    try {
        connection.query(
            "UPDATE `fashion` SET `PIC`=?,`TITLE`=? WHERE FASHION_ID = ?",
            // "INSERT INTO fashion(`pic`, `title`) VALUES (?,?)", //ดึงข้อมูล
            [pic, title, id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.affectedRow === 0) {
                    return res.status(404).json({ message: "Error, while inserting fashion to database" })
                }
                res.status(200).json({ message: "fashion updated successfully!" })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})

//ลบ fashion
app.delete("/delete_fashion", async (req, res) => {
    const id = req.body.id;
    try {
        connection.query(
            "DELETE FROM fashion WHERE FASHION_ID = ?", //ดึงข้อมูล
            [id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.affectedRow === 0) {
                    return res.status(404).json({ message: "No fashion with that id" })
                }
                res.status(200).json({ message: "fashion deleted successfully!" })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})

//----------------------------update new contents--------------------------------------//

//for admin to update place selection
app.post("/update_content", async (req, res) => {
    const { title, pic, body, date } = req.body
    try {
        connection.query(
            "INSERT INTO content(`TITLE`, `PIC`, `DETAIL`, `DATE`) VALUES (?,?,?,?)", //ดึงข้อมูล
            [title, pic, body, date],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "insert content successfully!" })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})

//----------------------------manage contents--------------------------------------//

//edit content
app.patch("/edit_content", async (req, res) => {
    const { pic, title, id } = req.body
    try {
        connection.query(
            "UPDATE content SET PIC = ?, TITLE = ? WHERE CONTENT_ID = ?",
            [pic, title, id],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "update content successfully!" })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})

//ลบ content
app.post("/delete_content", async (req, res) => {
    const title = req.body.title;
    try {
        connection.query(
            "DELETE FROM content WHERE TITLE = ?", //ดึงข้อมูล
            [title],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.affectedRow === 0) {
                    return res.status(404).json({ message: "No content with that title" })
                }
                res.status(200).json({ message: "content deleted successfully!" })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})

//----------------------------question and concern for admin--------------------------------------//

//for showing unanswer question and concern to admin
app.get("/unanswer_concern", async (req, res) => {
    try {
        connection.query(
            "SELECT account.ACCOUNT_EMAIL, concern.CHANNEL_ID, concern.TITLE FROM `concern` JOIN `account` ON account.ACCOUNT_ID = concern.ACCOUNT_ID WHERE 'IS_FINISH' = 0",
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "Can't find any unanswer question and concern" });
                }
                return res.status(200).json({ status: "success", message: "Get information successfully!", results: results })
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//for showing answered question and concern to admin
app.get("/answered_concern", async (req, res) => {
    try {
        connection.query(
            "SELECT account.ACCOUNT_EMAIL, concern.CHANNEL_ID, concern.TITLE FROM `concern` JOIN `account` ON account.ACCOUNT_ID = concern.ACCOUNT_ID WHERE 'IS_FINISH' = 1",
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "Can't find any answered question and concern" });
                }
                return res.status(200).json({ status: "success", message: "Get information successfully!", results: results })
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

// //for showing unanswer question and concern to admin
// app.get("/unanswer_concern", async (req, res) => {
//     try {
//         connection.query(
//             "SELECT TEXT FROM concern WHERE ANSWER IS NULL",
//             (err, results, fields) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(400).send();
//                 }
//                 if (results.length === 0)
//                 {
//                     return res.status(400).json({status:"fail", message: "Error, Can't find any unanswer question and concern"});
//                 }
//                 return res.status(200).json({status:"success", message : "Get information successfully!", results: results})
//             }
//         )
//     }
//     catch(err) {
//         console.log(err);
//         return res.status(500).send();
//     }
// })

// //for admin to question and concern
// app.patch("/ans_concern", async (req, res) => {
//     const {id,text} = req.body

//     try {
//         //เก็บข้อความตอบกลับไว้ในฐานข้อมูล
//         connection.query(
//             "INSERT INTO concern(`ANSWER`) VALUES (?)",
//             [text],
//             (err, results, fields) => {
//                 if (err) {
//                     console.log(err);
//                     return res.status(400).send();
//                 }
//                 //ส่งข้อความตอบกลับไปที่อีเมลของผู้ใช้
//                 connection.query(
//                     "SELECT ACCOUNT_EMAIL FROM account WHERE ACCOUNT_ID = ?",
//                     [id],
//                     (err, results, fields) => {
//                         if (err) {
//                             console.log(err);
//                             return res.status(400).send();
//                         }

//                         const text_sending = {
//                             from: process.env.MYMAIL,
//                             to: results[0].ACCOUNT_EMAIL,
//                             subject: 'Thank you for your feedback to Orange',
//                             text: text
//                         };

//                         transporter.sendMail(text_sending, (err, info) => {
//                             if (err) {
//                                 console.log(err);
//                                 return res.status(400).send();
//                             }
//                             return res.status(200).json({status:"success", message : "User's question and concern answered successfully!"})
//                         });
//                     }
//                 )
//             }
//         )

//     }
//     catch(err) {
//         console.log(err);
//         return res.status(500).send();
//     }
// })

//for showing answered question and concern to admin
app.get("/answered_concern", async (req, res) => {
    try {
        connection.query(
            "SELECT TEXT , ANSWER FROM concern WHERE ANSWER IS NOT NULL ORDER BY CONCERN_ID ASC",
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.length === 0) {
                    return res.status(400).json({ status: "fail", message: "Error, Can't find any answered question and concern" });
                }
                return res.status(200).json({ status: "success", message: "Get information successfully!", results: results })
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//----------------------------ข้างล่างไม่ใช้มั้ง--------------------------------------//

//ดึงข้อมูล account ทั้งหมด
app.get("/read_account", async (req, res) => {
    try {
        connection.query(
            "SELECT * FROM account", //ดึงข้อมูล
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json(results)
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//read single ดึงแค่ข้อมูล account ที่ต้องการ
app.get("/read_account/single/:email", async (req, res) => {
    const email = req.params.email; //รับตัวแปร email
    try {
        connection.query(
            "SELECT * FROM account WHERE ACCOUNT_EMAIL = ?", //ดึงข้อมูล
            [email],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json(results)
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//DELETE ลบ account
app.delete("/delete_account/:email", async (req, res) => {
    const email = req.params.email;
    try {
        connection.query(
            "DELETE FROM account WHERE ACCOUNT_EMAIL = ?", //ดึงข้อมูล
            [email],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results.affectedRow === 0) {
                    return res.status(404).json({ message: "No account with that email" })
                }
                res.status(200).json({ message: "account deleted successfully!" })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})

//filter premium กรองเฉพาะแอคที่ใช้ premium อยู่
app.get("/premium_account/:IS_PREMIUM", async (req, res) => {
    const IS_PREMIUM = req.params.IS_PREMIUM;
    try {
        connection.query(
            "SELECT * FROM account WHERE IS_PREMIUM = ?", //ดึงข้อมูล
            [IS_PREMIUM],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json(results)
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//join account and premium table กรองเฉพาะแอคที่สมัคร premium หรือเคยสมัคร
app.get("/join_premium_account", async (req, res) => {
    try {
        connection.query(
            "SELECT * FROM account JOIN premium WHERE account.ACCOUNT_ID = premium.ACCOUNT_ID", //ดึงข้อมูล
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json(results)
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//format next bill date ตั้งเวลา next bill date เป็น 28 วันถัดไปจากปัจจุบัน
app.patch("/format_date", async (req, res) => {
    try {
        connection.query(
            "UPDATE premium SET NEXT_BILL_DATE = DATE_ADD(CURRENT_DATE(), INTERVAL 28 DAY)", //ดึงข้อมูล
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "Account updated password successfully!" })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})

//มี account อยู่รึเปล่า
app.get("/is_have_account/:email", async (req, res) => {
    const email = req.params.email; //รับตัวแปร email
    try {
        connection.query(
            "SELECT * FROM account WHERE ACCOUNT_EMAIL = " + mysql.escape(email), //ดึงข้อมูลแบบระวังแฮคมั้ง
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                if (results === '') {
                    return res.status(404).json({ message: "No account with this email" })
                }
                res.status(200).json(results)
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

//UPDATE data เปลี่ยน password
app.patch("/update_account/:email", async (req, res) => {
    const email = req.params.email
    const newPassword = req.body.newPassword;
    try {
        connection.query(
            "UPDATE account SET ACCOUNT_PASSWORD = ? WHERE ACCOUNT_EMAIL = ?", //ดึงข้อมูล
            [newPassword, email],
            (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }
                res.status(200).json({ message: "Account updated password successfully!" })
            })
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }

})

//เพิ่ม account ใหม่
app.post("/create_account", async (req, res) => {
    const { email, password } = req.body

    try {
        connection.query(
            "INSERT INTO account(ACCOUNT_EMAIL, ACCOUNT_PASSWORD) VALUES(?, ?)", //insert ข้อมูล
            [email, password], //แทน ?
            (err, results, fields) => {
                if (err) {
                    console.log("Error while inserting a user into the database", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "New user successfully created!" });
            }
        )
    }
    catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.listen(3360, results['Wi-Fi'][0], () => console.log('Server is running on port', results['Wi-Fi'][0], ':3360'));