const express = require("express");

const router = express.Router();



const authMiddleware = require("../middlewares/auth.middleware");
const habitsController = require("../controllers/habits.controller");

router.get("/", authMiddleware, habitsController.getHabits);

router.get("/:id", authMiddleware, habitsController.getHabitById);

router.post("/", authMiddleware, habitsController.createHabit);

router.patch("/:id", authMiddleware, habitsController.updateHabit);

router.post("/:id/check-in", authMiddleware, habitsController.checkInHabit);

router.delete("/:id", authMiddleware, habitsController.deleteHabit);

module.exports = router