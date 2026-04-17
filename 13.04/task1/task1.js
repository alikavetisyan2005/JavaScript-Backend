const fs = require("node:fs")
const path = require("node:path");
const dataProcess = require("./dataProcess.js");


const read = fs.readFileSync("input.json", "utf-8");
const data = JSON.parse(read);

const modified = dataProcess(data);

const outputPath = path.join(__dirname, "output.json");

fs.writeFileSync(outputPath, JSON.stringify(modified, null, 2), "utf-8");
