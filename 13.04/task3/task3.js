const generate = require("./generate.js");
const fs = require('node:fs');
const path = require("node:path");

const dir = process.argv[2];
const title = process.argv[3];

if(!dir || !title){
    console.log("something went worng...")
}
const fileName = "index.html";
const pathToFile = path.join(dir, fileName);


const absolutePath = path.resolve(pathToFile);

const content = generate(title);

fs.writeFile(absolutePath,content, (err) => {
    if(err){
        console.log("error accured while  writing file", err);
        return;
    }
    console.log("file writen successfully");
})