const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser')
const { createClient } = require('@supabase/supabase-js');
const { z } = require('zod');
const { CreateDormRequest, CreateReviewRequest, PutReviewRequest } = require('./type');

const { SUPABASE_URL, SUPABASE_KEY, SUPABASE_JWT_SECRET, LOG_LEVEL } = require('./config');
const { getMimeTypeFromBase64, getFileExtensionFromMimeType, getRawBase64, isImage } = require('./util');
const { log } = require('console');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const logger = require('pino')({ level: LOG_LEVEL || 'info' });
const cors = require('cors');

const app = express.Router();

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }))

app.get('/users/:id', async (req, res) => {
    try {
        const { data: user, error } = await supabase.from('users').select().eq('id', req.params.id);
        if (error) {
            logger.error(error);
            res.status(500).send();
            return;
        }
        if (user.length === 0) {
            res.status(404).send();
            return;
        }
        res.json(user[0]);
    } catch (error) {
        logger.error(error);
        res.status(500).send();
    }
});

app.get('/dorms/:id', async (req, res) => {
    try {
        const { data: dorm, error } = await supabase.schema('dorms').from('dorms').select().eq('id', req.params.id).single();
        if (error) {
            logger.error(error);
            res.status(500).send();
            return;
        }
        if (dorm.length === 0) {
            res.status(404).send();
            return;
        }
        const { data: facilities, error: facilitiesError } = await supabase.schema('dorms').from('dorms_facilities').select('facility_id, facilities(name)').eq('dorm_id', dorm.id);
        if (facilitiesError) {
            logger.error(facilitiesError);
            res.status(500).send();
            return;
        }
        const { data: photos, error: photosError } = await supabase.schema('dorms').from('photos').select('photo_url').eq('dorm_id', dorm.id);
        if (photosError) {
            logger.error(photosError);
            res.status(500).send();
            return;
        }
        dorm.facilities = facilities.map(f => ({ id: f.facility_id, name: f.facilities.name }));
        dorm.photos = photos.map(p => p.photo_url);
        res.json(dorm);
    } catch (error) {
        logger.error(error);
        res.status(500).send();
    }
});

app.get('/dorms/:id/reviews', async (req, res) => {
    try {
        const { data: reviews, error: reviewsError } = await supabase.schema('dorms').from('reviews').select('user_id, stars, short_review, review').eq('dorm_id', req.params.id);
        if (reviewsError) {
            logger.error(reviewsError);
            res.status(500).send();
            return;
        }
        const { data: avg, error: avgError } = await supabase.schema('dorms').from('average_stars').select('*').eq('dorm_id', req.params.id);
        if (avgError) {
            logger.error(avgError);
            res.status(500).send();
            return;
        }
        let average = null;
        if (avg.length === 1) {
            average = avg[0].average;
        }
        res.json({ reviews, average });
    } catch (error) {
        logger.error(error);
        res.status(500).send();
    }
});

app.use((req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    jsonwebtoken.verify(token, SUPABASE_JWT_SECRET, (err, decoded) => {
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
            const { data: pictureMetadata } = supabase.storage.from('dorms').getPublicUrl(uploadData.path);
            const { error: insertError } = await supabase.schema('dorms').from('photos').insert({
                dorm_id: result[0].id,
                photo_url: pictureMetadata.publicUrl
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

app.get('/dorms/:id/review', async (req, res) => {
    try {
        const { data: review, error } = await supabase.schema('dorms').from('reviews').select('user_id, stars, short_review, review').eq('dorm_id', req.params.id).eq('user_id', req.user.sub);
        if (error) {
            logger.error(error);
            res.status(500).send();
            return;
        }
        if (review.length === 0) {
            res.status(404).send();
            return;
        }
        res.json(review[0]);
    } catch (error) {
        logger.error(error);
        res.status(500).send();
    }
});

app.post('/dorms/:id/review', async (req, res) => {
    try {
        const data = CreateReviewRequest.parse(req.body);
        const { status, error } = await supabase.schema('dorms').from('reviews').insert({
            user_id: req.user.sub,
            dorm_id: req.params.id,
            stars: data.stars,
            short_review: data.short_review,
            review: data.review
        });
        if (status === 409) {
            res.status(409).send();
            return;
        }
        if (error) {
            logger.error(error);
            res.status(500).send();
            return;
        }
        res.status(201).send();
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

app.put('/dorms/:id/review', async (req, res) => {
    try {
        const data = PutReviewRequest.parse(req.body);
        if (!data.review) {
            data.review = null;
        }
        const { data: result, error } = await supabase.schema('dorms').from('reviews')
            .update(data)
            .eq('dorm_id', req.params.id)
            .eq('user_id', req.user.sub).select('user_id');
        if (error) {
            logger.error(error);
            res.status(500).send();
            return;
        }
        if (result.length === 0) {
            res.status(404).send();
            return;
        }
        res.status(200).send();
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

app.delete('/dorms/:id/review', async (req, res) => {
    try {
        const { error } = await supabase.schema('dorms').from('reviews').delete().eq('user_id', req.user.sub).eq('dorm_id', req.params.id);
        if (error) {
            logger.error(error);
            res.status(500).send();
            return;
        }
        res.status(204).send();
    } catch (error) {
        logger.error(error);
        res.status(500).send();
    }
});

module.exports = app;