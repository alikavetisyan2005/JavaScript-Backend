const fileDb = require("../utils/fileDb");
const AppError = require("../utils/AppError");
const { hashPassword, verifyPassword } = require("../utils/hash");
const { generateId } = require("../utils/id");
const path = require("node:path");
const { signToken } = require("../utils/token");
const userModel = require("../models/user.model");

const filePath = path.join(__dirname, "../../data/users.json");



async function register(data) {
    const users = await userModel.getAllUsers();
    

    const exists = users.find(user => user.username === data.username);

    if(exists){
        throw new AppError("Username already exists", 400);
    }

    const newUser = {
        id: generateId(),
        username: data.username,
        passwordHash: await hashPassword(data.password),
        createdAt: new Date().toISOString(),
    }

    await userModel.createUser(newUser);


    const token = signToken({
        id: newUser.id,
        username: newUser.username,
    })



    return {token};
}


async function login(data) {
    const users = await userModel.getAllUsers();

    const {username, password} = data;

    if(!username || !password){
        throw new AppError("Required data", 400)
    }

    const user = await userModel.getUserByUsername(username);

    if(!user){
        throw new AppError("User not found", 404)
    }

    const isValid = await verifyPassword(password, user.passwordHash);

    if(!isValid){
        throw new AppError("wrong password", 401);
    }

    const token = signToken({
        id: user.id,
        username: user.username
    })

    return {token}
}


async function getMe(userId) {

    const me = await userModel.getUserById(userId);

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