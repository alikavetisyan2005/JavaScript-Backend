const AppError = require("../utils/AppError");
const fileDb = require("../utils/fileDb");
const { generateId } = require("../utils/id");
const path = require("node:path");
const bookModel = require("../models/books.model")

const filePath = path.join(__dirname, "../../data/books.json");

async function getBooks(userId) {
  const userBooks = await bookModel.getBooksByUserId(userId)

  return userBooks;
}

async function getBookById(userId, id) {

  const book = await bookModel.getBookById(id);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  if (book.ownerId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  return book;
}

async function createBook(userId, data) {

  const newBook = {
    id: generateId(),
    ownerId: userId,
    title: data.title,
    author: data.author,
    status: data.status || "to read",
    rating: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await bookModel.createBook(newBook);

  return newBook;
}
async function updateBook(userId, id, data) {

    const book = await booksModel.getBookById(id);

    if (!book) {
        throw new AppError("Book not found", 404);
    }

    if (book.ownerId !== userId) {
        throw new AppError("Forbidden", 403);
    }

    const finalStatus = data.status ?? book.status;

    if (data.rating !== undefined && finalStatus !== "finished") {
        throw new AppError("Rating only allowed for finished books", 400);
    }

    const updatedBook = {
        ...book,
        title: data.title ?? book.title,
        author: data.author ?? book.author,
        rating: data.rating ?? book.rating,
        status: finalStatus,
        updatedAt: new Date().toISOString(),
    };

    return await booksModel.updateBook(id, updatedBook);
}
async function updateBook(userId, id, data) {

    const book = await booksModel.getBookById(id);

    if (!book) {
        throw new AppError("Book not found", 404);
    }

    if (book.ownerId !== userId) {
        throw new AppError("Forbidden", 403);
    }

    const finalStatus = data.status ?? book.status;

    if (data.rating !== undefined && finalStatus !== "finished") {
        throw new AppError("Rating only allowed for finished books", 400);
    }

    const updatedBook = {
        ...book,
        title: data.title ?? book.title,
        author: data.author ?? book.author,
        rating: data.rating ?? book.rating,
        status: finalStatus,
        updatedAt: new Date().toISOString(),
    };

    return await booksModel.updateBook(id, updatedBook);
}
async function deleteBook(userId, id) {

    const book = await booksModel.getBookById(id);

    if (!book) {
        throw new AppError("Book not found", 404);
    }

    if (book.ownerId !== userId) {
        throw new AppError("Forbidden", 403);
    }

    await booksModel.deleteBook(id);

    return book;
}

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}

