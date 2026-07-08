const jwt = require("jsonwebtoken")
const {jwt: jwtConfig} = require("../config/env")

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user._id,
        role: user.role
    },
    jwtConfig.accessSecret,
    {expiresIn: "15m"}
    )
}

function verifyRefreshToken(token) {
  return jwt.verify(
    token,
    jwtConfig.refreshSecret
  );
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user._id,
        role: user.role
    },
    jwtConfig.refreshSecret,
    {expiresIn: "7d"}
    )
} 

module.exports = {generateAccessToken, generateRefreshToken, verifyRefreshToken}