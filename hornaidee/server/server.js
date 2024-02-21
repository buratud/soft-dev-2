const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser')
const { createClient } = require('@supabase/supabase-js');
const { z } = require('zod');
const { CreateDormRequest } = require('./type');

const { SUPABASE_URL, SUPABASE_KEY, JWT_SECRET, LOG_LEVEL } = require('./config');
const { getMimeTypeFromBase64, getFileExtensionFromMimeType, getRawBase64, isImage } = require('./util');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const logger = require('pino')({ level: LOG_LEVEL || 'info' });

const app = express.Router();

app.use(bodyParser.json({ limit: '50mb' }))

app.use((req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    jsonwebtoken.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            logger.error(err);
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
        const { facilities, photos, ...dormData } = data;
        const { data: result, error } = await supabase.schema('dorms').from('dorms').insert(dormData).select('id');
        logger.debug(result);
        if (error) {
            logger.error(error);
            res.status(500).send();
            return;
        }
        for (const facility of facilities) {
            const { error } = await supabase.schema('dorms').from('dorms_facilities').insert({
                dorm_id: result[0].id,
                facility_id: facility
            });
            if (error) {
                logger.error(error);
                res.status(500).send();
                return;
            }
        }
        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];
            const base64 = getRawBase64(photo);
            const decodedData = Buffer.from(base64, 'base64');
            const mimeType = getMimeTypeFromBase64(photo);
            const fileExtension = getFileExtensionFromMimeType(mimeType);
            if (!isImage(mimeType)) {
                res.status(400).send({ message: 'Only images are allowed' });
                return;
            }
            const { data: uploadData, error: uploadError } = await supabase.storage.from('dorms').upload(`dorms/${result[0].id}/${i}.${fileExtension}`, decodedData, {
                contentType: mimeType
            });
            if (uploadError) {
                logger.error(uploadError);
                res.status(500).send();
                return;
            }
            const { error: insertError } = await supabase.schema('dorms').from('photos').insert({
                dorm_id: result[0].id,
                photo_url: `${SUPABASE_URL}${uploadData.path}`
            })
            if (insertError) {
                logger.error(insertError);
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