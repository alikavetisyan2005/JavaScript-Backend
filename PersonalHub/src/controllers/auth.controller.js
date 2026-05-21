const authService = require("../services/auth.service");

async function register(req, res, next){
    try{
    const result = await authService.register(req.body);
    res.status(201).json(result);
    }
    catch(err){
        next(err)
    }
}

async function login(req, res, next) {
    try {
        const result = await authService.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

async function getMe(req, res , next) {
    try {
        const result = await authService.getMe(req.user.id)
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

async function logout(req, res, next) {
    try{
        res.clearCookie("authentication");
        res.status(200).json({message: "successfully logged out"})
    }
    catch(error){
        next(error);
    }
}



module.exports = {
    login,
    register,
    getMe, 
    logout
}