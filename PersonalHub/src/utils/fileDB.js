const fs = require("fs").promises;

async function readJson(filename) {
    try {
        const data = await fs.readFile(filename, "utf-8");
        return data ? JSON.parse(data) : [];
    } catch (err) {
        return [];
    }
}

async function writeJson(filename, data) {
    await fs.writeFile(
        filename,
        JSON.stringify(data, null, 2),
        "utf-8"
    );
}

module.exports = {
    readJson,
    writeJson
};