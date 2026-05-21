const crypto = require("crypto")
function generateID(){
    return crypto.randomUUID();
}

module.exports = {
    generateID
}