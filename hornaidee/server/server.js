const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser')
const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_URL, SUPABASE_KEY, JWT_SECRET } = require('./config');
const { CreateDormRequest } = require('./type');
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
            res.status(401).send({ message: 'Unauthorized' });
        } else {
            req.user = decoded;
            next();
        }
    });
})

app.post('/dorms', async (req, res) => {
    try {
        req.body.owner = req.user.sub;
        const data = CreateDormRequest.parse(req.body);
        const { result, error } = await supabase.schema('dorms').from('dorms').insert(data).select('id');
        if (error) {
            logger.error(error);
            res.status(500).send();
            return;
        }
        for (const facility of data.facilities) {
            const { error } = await supabase.schema('dorm_facilities').from('dorm_facilities').insert({
                dorm_id: result[0].id,
                facility_id: facility
            });
            if (error) {
                logger.error(error);
                res.status(500).send();
                return;
            }
        }
        res.status(201).json(result[0]);
    } catch (error) {
        if (error instanceof z.ZodError) {
            logger.debug(error.errors);
            res.status(400).json(error.errors);
            return;
        }
        logger.error(error);
        res.status(500).send();
    }
});

module.exports = app;