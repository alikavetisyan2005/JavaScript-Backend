const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");


const auth = (req, res, next) => {
  let token = null;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

  }

  if(!token && req.cookies?.authetication){
    token = req.cookies.authetication;
  }

  if(!token){
    throw new AppError("Not authorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next()
  } catch (error) {
    return next(error)
  }
};


module.exports = auth;
