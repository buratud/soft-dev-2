const { z } = require('zod');

exports.CreateDormRequest = z.object({
    owner: z.string(),
    name: z.string().min(1),
    address: z.string().min(1),
    property_number: z.string().optional(),
    city: z.string().nullable().optional(),
    province: z.string().min(1),
    zip_code: z.string().length(5),
    rent_price: z.number(),
    facilities: z.array(z.number()),
    photos: z.array(z.string().min(1)).min(1),
    latitude: z.number(),
    longitude: z.number(),
});

exports.PutDormRequest = z.object({
    owner: z.string(),
    name: z.string().min(1),
    address: z.string().min(1),
    property_number: z.string().optional(),
    city: z.string().nullable().optional(),
    province: z.string().min(1),
    zip_code: z.string().length(5),
    rent_price: z.number(),
    facilities: z.array(z.number()),
    photos: z.array(z.string().min(1)).min(1),
    latitude: z.number(),
    longitude: z.number(),
});

exports.CreateReviewRequest = z.object({
    stars: z.number().int().min(1).max(5),
    short_review: z.string().min(1),
    review: z.string().optional(),
});

exports.PutReviewRequest = z.object({
    stars: z.number().int().min(1).max(5),
    short_review: z.string().min(1),
    review: z.string().optional(),
});
