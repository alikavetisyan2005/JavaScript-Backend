const fs = require("node:fs");
const path = require("node:path");
const templateEngine = require("./templateEngine");

const templatePath = path.join(__dirname, "template.txt");
const outputDir = path.join(__dirname, "output");
const outputFile = path.join(outputDir, "result.txt");
const content = fs.readFileSync(templatePath, "utf8");

const variables = {
    name: "Arman",
    age: 30,
};

const result = templateEngine(content, variables);

fs.writeFileSync(outputFile,result);