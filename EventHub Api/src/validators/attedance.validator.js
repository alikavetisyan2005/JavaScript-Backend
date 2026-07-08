const z = require("zod");
const mongoose = require("mongoose");

const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: "Invalid ObjectId" }
);

const attedanceSchema = z.object({
    body: z.object({
        status: z.enum(["going", "interested", "cancelled"]).default("going")
    }),
})

module.exports = attedanceSchema;