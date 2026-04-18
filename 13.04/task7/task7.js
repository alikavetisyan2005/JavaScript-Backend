const fs = require("fs");
const path = require("path");
const dirs = require("./dirs");

const root = path.join(__dirname, "dirs");
dirs.forEach((dir) => {
    const dirPath = path.join(root, dir);

    fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
            console.error("Error occured", err);
        } else {
            console.log("Created directory:", dirPath);
        }
    });
});


