const faker = require("faker")
const uuid = require("uuid")
const events = require("events")
const path = require("path")
const convertObjectToSql = require("./utils/convertObjectToSql")
const { writeLineToFile, deleteFile } = require("./utils/writeLineToFile")

const schemaGeneratorEmitter = new events.EventEmitter();

schemaGeneratorEmitter.on("load", () => {
    process.stdout.write("=")
})

schemaGeneratorEmitter.on("end", () => {
    process.stdout.write("\n")
})

async function createSqlFile(initSchema, rows, tableName, outFileName) {
    await deleteFile(path.join(__dirname, `../output/${outFileName}.sql`))
    const items = []

    const idealStep = Math.floor(rows / 50);
    let step = 0

    for (let i = 0; i < rows; i++) {
        const structure = Object.assign({}, initSchema)

        let _id = null
        if (structure["id"]) {
            if (structure["id"] === "id") {
                _id = i
            } else {
                _id = uuid.v4()
            }
        }
        for (const key of Object.keys(structure)) {
            if (key === "id") {
                structure[key] = _id
                continue
            }

            const arr = structure[key].split(".")
            structure[key] = faker[arr[0]][arr[1]]()
        }
        items.push(structure)

        const sql = convertObjectToSql(structure, tableName)
        await writeLineToFile(path.join(__dirname, `../output/${outFileName}.sql`), sql)
        

        step += 1
        if (step === idealStep) {
            step = 0
            schemaGeneratorEmitter.emit("load")
        }
        
    }
    
    schemaGeneratorEmitter.emit("end")
    return items
}

module.exports = createSqlFile