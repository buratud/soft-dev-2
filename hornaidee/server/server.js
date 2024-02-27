const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const bodyParser = require('body-parser')
const { createClient } = require('@supabase/supabase-js');
const { z } = require('zod');
const { search } = require("./search");
const { CreateDormRequest, CreateReviewRequest, PutReviewRequest, PutDormRequest} = require('./type');

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

app.get('/dorms/search', async (req, res) => {
    try {
        const {name: searchTerm, filter:facilityFilter, range: priceRange} = req.body;
        const { data: dormsList, error } = await supabase.schema('dorms').from('dorms').select();
        if (error) {
            logger.error(error);
            res.status(500).send();
            return;
        }
        logger.debug(dormsList.length)
        for (const dorm of dormsList) {
            if (dorm.rent_price < priceRange[0] || dorm.rent_price > priceRange[1]) {
                const index = dormsList.indexOf(dorm)
                dormsList.splice(index, index + 1)
                continue
            }
            logger.debug([dorm.rent_price, priceRange[0], priceRange[1], dorm.rent_price < priceRange[0] || dorm.rent_price > priceRange[1]])

        }
        
        logger.debug(dormsList.length)
        for (const dorm of dormsList) {
            const { data: facilities, error: facilitiesError } = await supabase.schema('dorms').from('dorms_facilities').select('facility_id').eq('dorm_id', dorm.id);
            if (facilitiesError) {
                logger.error(facilitiesError);
                res.status(500).send();
                return;
            }
            const facilitiesID = facilities.map(object => object.facility_id)

            for (const facility of facilityFilter) {
                if (facilitiesID.includes(facility) == false) {
                    const index = dormsList.indexOf(dorm)
                    dormsList.splice(index, index + 1)
                    continue
                }
                // logger.debug([facility, facilitiesID])
            }
        }
        logger.debug(dormsList.length)

        const result = search(searchTerm, dormsList);
        if (result.notFound) {
            res.status(404).json({message: 'There are no matching dorms'});
        }

        res.json(result);
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

app.put('/dorms/:id', async (req, res) => {
    try {
        const data = PutDormRequest.parse(req.body);
        const { facilities, photos, ...dormData } = data;

        const { data: dormInfo, error: InfoError } = await supabase.schema('dorms').from('dorms').select('owner').eq('id', req.params.id);
        if (InfoError) {
            logger.error(InfoError);
            res.status(500).send();
            return;
        }
        const dormOwner = dormInfo.map(object => object.owner)[0]

        if (req.user.sub != dormOwner) {
            res.status(403).json({message: 'You are not the owner of this dorm'});
            return;
        }

        const { data: result, error } = await supabase.schema('dorms').from('dorms')
            .update(dormData)
            .eq('id', req.params.id)
            .select('id');
        if (error) {
            logger.error(error);
            res.status(500).send();
            return;
        }

        const { data: facilitiesID, error: facilitiesError } = await supabase.schema('dorms').from('dorms_facilities').select('facility_id').eq('dorm_id', req.params.id);
        if (facilitiesError) {
            logger.error(facilitiesError);
            res.status(500).send();
            return;
        }
        const facilitiesList = facilitiesID.map(object => object.facility_id)

        for (const facility of facilitiesList) {
            const { error } = await supabase.schema('dorms').from('dorms_facilities').delete()
                .eq('dorm_id', req.params.id)
                .eq('facility_id', facility)
            if (error) {
                logger.error(error);
                res.status(500).send();
                return;
            }
        }

        for (const facility of facilities) {
            const { insertError } = await supabase.schema('dorms').from('dorms_facilities').insert({
                dorm_id: result[0].id,
                facility_id: facility
            });
            if (insertError) {
                logger.error(insertError);
                res.status(500).send();
                return;
            }
        }

        const { data: photosURL, error: photosError } = await supabase.schema('dorms').from('photos').select('photo_url').eq('dorm_id', req.params.id);
        if (photosError) {
            logger.error(photosError);
            res.status(500).send();
            return;
        }
        const photosList = photosURL.map(object => object.photo_url)

        for (const photo of photosList) {
            const { error } = await supabase.schema('dorms').from('photos').delete()
                .eq('dorm_id', req.params.id)
                .eq('photo_url', photo)
            const { data: uploadData, error: uploadError } = await supabase.storage.from('dorms')
                .remove([photo.split('/public/dorms/')[1]]);
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
            const { data: uploadData, error: uploadError } = await supabase.storage.from('dorms')
                .upload(`dorms/${result[0].id}/${i}.${fileExtension}`, decodedData, {contentType: mimeType});

            if (uploadError) {
                if (uploadError.statusCode === "409") {
                    const pic = `https://linux-vm-southeastasia-4.southeastasia.cloudapp.azure.com/storage/v1/object/public/dorms/dorms/${result[0].id}/${i}.${fileExtension}`
                    const position = photosList.indexOf(pic)
                    photosList.splice(position, position + 1)
                    continue
                }
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

        res.status(200).send({ message: "Update sucessfully" });

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

//-----------------------------Blogger-----------------------------------

app.post('/blogger_list', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('blogger')
        .select('*')
      if (error) {
        throw error;
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  
  // api.post('/search_blogger', async (req, res) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('blog.blog')
  //       .select('users(id)')
  //     if (error) {
  //       console.log(error)
  //       throw error;
  //     } else {
  //       res.status(200).json(data);
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // })

module.exports = app;