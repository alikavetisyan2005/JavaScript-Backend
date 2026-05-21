const fs = require("fs").promises;

async function readJson (filename) {
    const data = await fs.readFile(filename, "utf-8")

    return JSON.parse(data);
}

async function writeJson(filename, data){
    await fs.writeFile(filename, JSON.stringify(data, 2,null), "utf-8");
}

module.exports = {
    readJson, 
    writeJson
}

