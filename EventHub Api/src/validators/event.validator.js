const z = require("zod");
const mongoose = require("mongoose");

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ObjectId" }
);

const eventSchema = z.object({
    body: z.object({
        title: z.string().trim().min(1).max(40),
        location: z.string().min(1).max(100),
        description: z.string().min(1),
        date: z.date(),
        capacity: z.number().int().default(0),
        category: z.enum(['music',  'tech', 'sport', 'other']).default('other'),
        image: z.string().optional(),
        organizer: objectIdSchema,
        attendes: z.array(objectIdSchema).optional()
})

})

module.exports = eventSchema