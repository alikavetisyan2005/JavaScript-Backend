const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const booksController = require("../controllers/books.controller");

router.get("/", authMiddleware, booksController.getBooks);

router.get("/:id", authMiddleware, booksController.getBookById);

router.post("/", authMiddleware, booksController.createBook);

router.patch("/:id", authMiddleware, booksController.updateBook);

router.delete("/:id", authMiddleware, booksController.deleteBook);

module.exports = router;