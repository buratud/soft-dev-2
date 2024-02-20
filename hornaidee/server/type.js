const { z } = require('zod');

exports.CreateDormRequest = z.object({
    owner: z.string(),
    name: z.string(),
    address: z.string(),
    property_number: z.string().optional(),
    city: z.string().optional(),
    province: z.string(),
    zip_code: z.string(),
    rent_price: z.number(),
    facilities: z.array(z.number())
});

