const bcrypt = require("bcrypt");

function hashPassword(plain){
    return bcrypt.hashSync(plain, 10);
}

function verifyPassword(plain, hashed){
    return bcrypt.compareSync(plain, hashed);
}

module.exports = {
    verifyPassword,
    hashPassword
}