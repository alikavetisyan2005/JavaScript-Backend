const AppError = require("../utils/appError");
const fileDB = require("../utils/fileDB");
const {genereteID} =  require("../utils/id");
const path = require("node:path")

const filePath = path.join(__dirname, "../../data/notes.json");

async function getNotes(user_id){
    const notes = await fileDB.readJson(filePath);

    let userNotes = notes.filter(n => n.ownerId === user_id);

    return userNotes;
}

async function getNoteById(id, userId){
    const notes = await fileDB.readJson(filePath);

    const note = notes.find(n => n.id === id);

    if(!note) {
        throw new AppError("Note not found", 404);
    }

    if(note.ownerId !== userId){
        throw new AppError("Not authorized", 401)
    }


    return note
}

async function createNote(userId, data) {
    const notes = await fileDB.readJson(filePath);

    const newNote = {
        id: genereteID(),
        ownerId: userId,
        title: data.title,
        body: data.body,
        tags: data.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    notes.push(newNote);

    await fileDB.writeJson(filePath, notes);

    return newNote
}


async function updateNote(userId,id,  data) {
    const notes = await fileDB.readJson(filePath);

    const index = notes.findIndex(n => n.id === id);

    if(index === -1){
        throw new AppError("note not found", 404);
    }

    const note = notes[index];

    if(note.ownerId !== userId){
        throw new AppError("NOt authorized", 401)
    }

    notes[index] = {
        ...note,
        title: data.title ?? note.title,
        body: data.body ?? note.body,
        tags: data.tags ?? note.tags,
        updatedAt: new Date().toISOString()
    }

    await fileDB.writeJson(filePath, notes);

    return notes[index];
}


async function deleteNote(userId, id) {
    const notes = await fileDB.readJson(filePath);

    const note = notes.find(n => n.id === id);

    if(!note){
        throw new AppError("NOt found");
    }

    if(note.ownerId !== userId){
         throw new AppError("NOt auth");
    }

    const filtered = notes.filter(n => n.id !== id);

    await fileDB.writeJson(filePath, filtered);

    return note
}

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
}



