function logger(message){
    const now = new Date()
    const timeStamp = now.toISOString();
    return `${timeStamp}, ${message}\n`;
}
module.exports = logger