const path = require("node:path");
const fileDB = require("../utils/fileDB");
const AppError = require("../utils/AppError");

const filePath = path.join(__dirname, "../../data/notes.json");


const getAllNotes = async() => {
    const notes = await fileDB.readJson(filePath);
    return notes;
}

const getNotesByUserId = async(userId) => {
    const notes = await fileDB.readJson(filePath);

    const userNotes = notes.filter(note => note.ownerId === userId);

    return userNotes
}

const getNoteById = async(id) => {
    const notes = await fileDB.readJson(filePath);

    return notes.find(note => note.id === id);
}

const createNote = async(noteData) => {
    const notes= await fileDB.readJson(filePath);

    notes.push(noteData);

    await fileDB.writeJson(filePath, notes);

    return noteData;

}

const updateNote = async(id, updatedData) => {
    const notes = await fileDB.readJson(filePath);

    const index =
        notes.findIndex(note => note.id === id);

    if(index === -1) return null;

    notes[index] = {
        ...notes[index],
        ...updatedData
    };

    await fileDB.writeJson(filePath, notes);

    return notes[index];
}

const deleteNote = async(id) => {

    const notes = await fileDB.readJson(filePath);

    const filtered =
        notes.filter(note => note.id !== id);

    await fileDB.writeJson(filePath, filtered);
}


module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    getNotesByUserId,
    deleteNote
}