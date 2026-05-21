const AppError = require("../utils/AppError");
const fileDb = require("../utils/fileDb");
const { generateId } = require("../utils/id");
const path = require("node:path");

const filePath = path.join(__dirname, "../../data/books.json");

async function getBooks(userId) {
  const books = await fileDb.readJson(filePath);

  const userBooks = books.filter((book) => book.ownerId === userId);

  return userBooks;
}

async function getBookById(userId, id) {
  const books = await fileDb.readJson(filePath);

  const book = books.find((book) => book.id === id);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  if (book.ownerId !== userId) {
    throw new AppError("Not authorized", 401);
  }

  return book;
}

async function createBook(userId, data) {
  const books = await fileDb.readJson(filePath);

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

  books.push(newBook);

  await fileDb.writeJson(filePath, books);

  return newBook;
}

async function updateBook(userId, id, data) {
  const books = await fileDb.readJson(filePath);

  const index = books.findIndex((book) => book.id === id);

  if (index === -1) {
    throw new AppError("Not found", 404);
  }

  const book = books[index];

  if (book.ownerId !== userId) {
    throw new AppError("Not auth", 401);
  }
  if (
    data.rating !== undefined &&
    book.status !== "finished" &&
    data.status !== "finished"
  ) {
    throw new AppError("Rating only allowed for finished books", 400);
  }

  books[index] = {
    ...book,
    title: data.title ?? book.title,
    author: data.author ?? book.author,
    rating: data.rating ?? book.rating,
    status: data.status ?? book.status,
    updatedAt: new Date().toISOString(),
  };

  await fileDb.writeJson(filePath, books);

  return books[index];
}

async function deleteBook(userId, id) {
  const books = await fileDb.readJson(filePath);

  const book = books.find((book) => book.id === id);

  if (!book) {
    throw new AppError("Not found", 404);
  }

  if (book.ownerId !== userId) {
    throw new AppError("Not auth", 401);
  }

  const filtered = books.filter((book) => book.id !== id);

  await fileDb.writeJson(filePath, filtered);

  return book;
}


module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}

