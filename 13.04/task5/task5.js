const fs = require("node:fs");
const path = require("node:path");
const logger = require("./logger");

const message = process.argv[2];

const logFilePath = path.join(__dirname, "logs.txt");   

const log = logger(message);

fs.appendFile(logFilePath, log, (err) => {
    if(err){
        console.error("Error accured...", err);
        return;
    }
    console.log("Message logged...")
})

