const z = require("zod");
const mongoose = require("mongoose")
const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ObjectId" }
);


const reviewSchema = z.object({
    params: z.object({
        eventId: objectIdSchema,
    }),
    body: z.object({
        rating: z.number().int().min(0).max(5),
        comment: z.string().min(1),
    })
})

module.exports = reviewSchema