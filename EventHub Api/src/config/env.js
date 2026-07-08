require("dotenv").config();
module.exports = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET
    }
}

