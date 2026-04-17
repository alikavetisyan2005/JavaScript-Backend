const path = require("node:path");
const fs = require("node:fs")


const inputPath = path.join(__dirname, "../task1/input.json");


fs.readFile(inputPath, "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    console.log("File content:", data);
}
)


