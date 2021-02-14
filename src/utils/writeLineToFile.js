const fs = require("fs").promises

async function deleteFile(pathToFile) {
    try { await fs.unlink(pathToFile) }
    catch (err) {}
}

async function writeLineToFile(pathToFile, line) {
    await fs.appendFile(pathToFile, line + "\n")
}

module.exports = {
    writeLineToFile,
    deleteFile
}