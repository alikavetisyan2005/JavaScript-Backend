const booksService = require("../services/books.service");

async function getBooks(req, res, next){

    try {
        const result = await booksService.getBooks(req.user.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function getBookById(req, res, next) {
    try {
        const result = await booksService.getBookById(req.user.id, req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function createBook(req, res, next) {
    try {
        const result = await booksService.createBook(req.user.id, req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

async function updateBook(req, res, next) {
    try {
        const result = await booksService.updateBook(req.user.id, req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

async function deleteBook(req, res, next)   {
    try {
        const result = await booksService.deleteBook(req.user.id, req.params.id);

        res.status(200).json({message: "Successfully deleted"});
    } catch (error) {
    next(error)        
    }
}


module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}
