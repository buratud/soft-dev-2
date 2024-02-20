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
    photos: z.array(z.number()).min(1),
});

