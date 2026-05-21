const path = require("node:path");
const fileDB = require("../utils/fileDB");
const AppError = require("../utils/AppError");

const filePath = path.join(__dirname, "../../data/users.json");
const getAllUsers = async () => {
    const users = await fileDB.readJson(filePath);
    return users;
}

const getUserByUsername = async(username) => {
    const users = await fileDB.readJson(filePath);

    return users.find(user => user.username === username);
}

const getUserById = async(id) =>{
    const users = await fileDB.readJson(filePath);

    return users.find(user => user.id === id);
}

const createUser = async(userData) =>{
    const users = await fileDB.readJson(filePath);
    

    users.push(userData);

    await fileDB.writeJson(filePath, users);

    return userData;
}



module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    getUserByUsername,
}

