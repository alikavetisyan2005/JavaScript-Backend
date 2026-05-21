const fileDb = require("../utils/fileDb");
const AppError = require("../utils/AppError");
const { hashPassword, verifyPassword } = require("../utils/hash");
const { generateID } = require("../utils/id");
const path = require("node:path");
const { signToken } = require("../utils/token");

const filePath = path.join(__dirname, "../../data/users.json");



async function register(data) {
    const users = await fileDb.readJson(filePath);

    const exists = users.find(user => user.username === data.username);

    if(exists){
        throw new AppError("Username already exists", 400);
    }

    const newUser = {
        id: generateID(),
        username: data.username,
        passwordHash: hashPassword(data.password),
        createdAt: new Date().toISOString(),
    }

    users.push(newUser);

    await fileDb.writeJson(filePath, users);

    const token = signToken({
        id: newUser.id,
        username: newUser.username,
    })



    return {token};
}


async function login(data) {
    const users = await fileDb.readJson(filePath);

    const {username, password} = data;

    if(!username || !password){
        throw new AppError("Required data", 400)
    }

    const user = users.find(user => user.username === username);

    if(!user){
        throw new AppError("User not found", 404)
    }

    const isValid = verifyPassword(password, user.passwordHash);

    if(!isValid){
        throw new AppError("wrong password", 400);
    }

    const token = signToken({
        id: user.id,
        username: user.username
    })

    return {token}
}


async function getMe(userId) {
    const users = await fileDb.readJson(filePath);

    const me = users.find(user => user.id === userId);

    if(!me){
        throw new AppError("user not found", 404);
    }

    return {
        id: me.id,
        username: me.username,
        createdAt: me.createdAt
    }
}

function logout(){
    return {message: "Logged out successfully"}
}

module.exports = {
    register,
    login,
    getMe,
    logout
}