const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const notesRoutes = require("./notes.routes");
const booksRoutes = require("./books.routes");
const habitsRoutes = require("./habits.routes");

router.use("/auth", authRoutes);
router.use("/notes", notesRoutes);
router.use("/books", booksRoutes);
router.use("/habits", habitsRoutes);

module.exports = router;