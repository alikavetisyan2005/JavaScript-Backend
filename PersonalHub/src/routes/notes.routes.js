const express = require("express");

const router = express.Router();

const notesController = require("../controllers/notes.controller");
const authMiddleware = require("../middlewares/auth.middleware");


router.get("/", authMiddleware, notesController.getNotes);

router.get("/:id", authMiddleware, notesController.getNoteById);

router.post("/", authMiddleware, notesController.createNote);

router.patch("/:id",authMiddleware, notesController.updateNote);

router.delete("/:id", authMiddleware, notesController.deleteNote);

module.exports = router