const jwt = require("jsonwebtoken");
const {jwt: jwtConfig} = require("../config/env");

const User = require("../models/User");
const AppError = require("../utils/AppError");


const isAuth = async (req, res, next) => {
    try{
    const authorization = req.headers.authorization;
    if(!authorization.startsWith("Bearer ")){
        throw new AppError(400,"Bearer token required");
    }


    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        throw new AppError(401,"Token not provided");
    }

    const decoded = jwt.verify(token, jwtConfig.accessSecret);

    const user = await User.findById(decoded.id)

    if(!user) throw new AppError(404, "User not found");

    req.user = user;
    next();
}
catch(err){
    next(new AppError(401,"Invalid token"))
}
}

module.exports = isAuth;

