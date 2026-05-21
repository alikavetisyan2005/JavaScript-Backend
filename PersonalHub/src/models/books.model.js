const path = require("node:path");
const fileDB = require("../utils/fileDB");

const filePath = path.join(__dirname, "../../data/books.json");

const getAllBooks = async () => {
    const books = await fileDB.readJson(filePath);
    return books;
};

const getBooksByUserId = async (userId) => {
    const books = await fileDB.readJson(filePath);

    return books.filter(book => book.ownerId === userId);
};

const getBookById = async (id) => {
    const books = await fileDB.readJson(filePath);

    return books.find(book => book.id === id);
};

const createBook = async (bookData) => {
    const books = await fileDB.readJson(filePath);

    books.push(bookData);

    await fileDB.writeJson(filePath, books);

    return bookData;
};

const updateBook = async (id, updatedData) => {
    const books = await fileDB.readJson(filePath);

    const index = books.findIndex(book => book.id === id);

    if (index === -1) return null;

    books[index] = {
        ...books[index],
        ...updatedData
    };

    await fileDB.writeJson(filePath, books);

    return books[index];
};

const deleteBook = async (id) => {
    const books = await fileDB.readJson(filePath);

    const filtered = books.filter(book => book.id !== id);

    await fileDB.writeJson(filePath, filtered);

    return id;
};

module.exports = {
    getAllBooks,
    getBooksByUserId,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};