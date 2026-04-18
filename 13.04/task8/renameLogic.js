let counter = 1;
function generateNewName(){
    return `file${counter++}.txt`;
}

module.exports = generateNewName;