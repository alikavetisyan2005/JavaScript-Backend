const router = require("express").Router();
const userController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const {registerSchema, loginSchema} = require("../validators/auth.validator");

router.post("/register",validate(registerSchema), userController.register);
router.post("/login", validate(loginSchema), userController.login);
router.get("/:id", userController.getUserById)
router.post("/refresh", userController.refresh);

module.exports = router;

