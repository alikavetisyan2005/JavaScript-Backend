const notesService = require("../services/notes.service");


async function getNotes(req, res, next) {
    try {
        const result = await notesService.getNotes(req.user.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function getNoteById(req, res, next) {
    try {
        const result = await notesService.getNoteById(req.params.id,req.user.id);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

async function createNote(req, res, next) {
    try {
        const result = await notesService.createNote(req.user.id, req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
}

async function updateNote(req, res, next) {
    try {
        const result = await notesService.updateNote(req.user.id, req.params.id, req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

async function deleteNote(req, res, next) {
    try {
        const result = await notesService.deleteNote(req.user.id, req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
}