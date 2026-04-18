const fs = require("node:fs");
const path = require("node:path");
const generateNewName = require("./renameLogic");

const dirPath = path.join(__dirname, "files");

fs.readdir(dirPath,(err,files) =>{
    if(err){
        console.log("error accured", err);
        return;
    }

    files.forEach(file =>{
        const oldPath = path.join(dirPath, file);
        const newPath = path.join(dirPath, generateNewName(file));
        fs.rename(oldPath, newPath, (err) =>{
            if(err){
                console.log("error accured", err);
                return;
            }
    })
})
})



