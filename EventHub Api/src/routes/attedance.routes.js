const router= require("express").Router();
const attedanceController = require("../controllers/attedance.controller");
const validate = require("../middlewares/validate.middleware");
const isAuth = require("../middlewares/auth.middleware");
const attedanceSchema = require("../validators/attedance.validator");

router.post(
  "/events/:eventId/attedance",
  isAuth,
  validate(attedanceSchema),
  attedanceController.joinEvent
);

router.delete(
    "/events/:eventId/attedance",
    isAuth,
    validate(attedanceSchema),
    attedanceController.leaveEvent
)


router.get(
    "/events/:eventId/attedance",
    isAuth,
    attedanceController.getEventAttendees
)

module.exports = router