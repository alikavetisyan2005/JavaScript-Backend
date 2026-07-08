const mongoose = require("mongoose");
const {mongoUrl} = require("../config/env");
const connectDb = async() => {
    try {
        await mongoose.connect(mongoUrl);
        console.log("Connected to database...")
    } catch (error) {
        console.log("Error occured while connecting");
        process.exit(1);
    }
}

module.exports = connectDb;