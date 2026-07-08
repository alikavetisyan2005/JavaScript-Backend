const router = require("express").Router();
const eventController = require("../controllers/event.controller");
const isAuth = require("../middlewares/auth.middleware");
const {isOrganizer, isMember} = require("../middlewares/role.middleware")
const validate = require("../middlewares/validate.middleware");
const eventSchema = require("../validators/event.validator");


router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/",isAuth, isOrganizer, validate(eventSchema), eventController.createEvent);
router.patch("/:id",isAuth,isOrganizer, eventController.updateEvent);
router.delete("/:id",isAuth, isOrganizer, eventController.deleteEvent);

module.exports = router



