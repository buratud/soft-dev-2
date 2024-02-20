const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser')
const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_KEY, JWT_SECRET } = require('./config');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-pretty'
  },
})


const app = express.Router();

app.use(bodyParser.json())

app.use((req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    jsonwebtoken.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            logger.debug(err);
            res.status(401).send({message: 'Unauthorized'});
        } else {
            req.user = decoded;
            next();
        }
    });
})

app.post('/dorms', async (req, res) => {
    try {
        const user_id = req.user.sub;
        const { name, address, property_number, city, province, zip_code, rent_price } = req.body;
        const { data, error } = await supabase.schema('dorms').from('dorms').insert({ name, owner: user_id, address, property_number, city, province, zip_code, rent_price }).select('id');
        if (error) {
            logger.error(error);
            res.status(500).send();
            return;
        }
        logger.debug(data);
        res.status(201).json(data);
    } catch (error) {
        logger.error(error);
        res.status(500).send();
    }
});

module.exports = app;