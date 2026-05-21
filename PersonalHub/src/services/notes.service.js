const AppError = require("../utils/appError");
const {generateId} =  require("../utils/id");
const notesModel = require("../models/notes.model");




async function getNotes(user_id){
    const userNotes = await notesModel.getNotesByUserId(user_id);
    return userNotes;
}

async function getNoteById(id, userId){
    const note = await notesModel.getNoteById(id)
    if(!note) {
        throw new AppError("Note not found", 404);
    }

    if(note.ownerId !== userId){
        throw new AppError("Not authorized", 401)
    }


    return note
}

async function createNote(userId, data) {
    const newNote = {
        id: generateId(),
        ownerId: userId,
        title: data.title,
        body: data.body,
        tags: data.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
    
    await notesModel.createNote(newNote);

    return newNote
}


async function updateNote(userId,id,  data) {
    const note = await notesModel.getNoteById(id);

    if(!note){
        throw new AppError("Note not found", 404);
    }

    if(note.ownerId !== userId){
        throw new AppError("Forbidden", 403);
    }

    const updatedNote = {
        ...data,
        updatedAt: new Date().toISOString()
    };

    return await notesModel.updateNote(id, updatedNote);
}


async function deleteNote(userId, id) {
    const note = await notesModel.getNoteById(id);

    if(!note){
        throw new AppError("Not found");
    }

    if(note.ownerId !== userId){
         throw new AppError("NOt auth");
    }

    await notesModel.deleteNote(id)

    return note
}

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
}



