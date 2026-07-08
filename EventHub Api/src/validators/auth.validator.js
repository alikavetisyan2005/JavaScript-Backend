const z = require("zod");

const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).max(20),
    email: z.string().trim().email(),
    password: z.string().min(6).max(80),
    role: z.enum(["member", "organizer"]).optional(),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email(),
    password: z.string().min(6, "Password is required"),
  }),
});

module.exports = { loginSchema, registerSchema };
