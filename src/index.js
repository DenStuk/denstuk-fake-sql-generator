const readline = require("readline-sync")
const createSqlFile = require("./createSqlFile")

function consoleInput(message) {
    return readline.question(message)
}

const testSchema = {
    "id": "id",
    "name": "name.firstName"
}

// const _test_ = () => {
//     const schemas = await createSqlFile(testSchema, 100)
// }

async function main() {
    process.stdout.write("Fake SQL Generator \n")

    const tableName = consoleInput("Input table name: ")
    const rowsAmount = parseInt(consoleInput("Input rows amount: "))
    const outFileName = consoleInput("Input output filename: ")

    process.stdout.write("Input END to stop \n")

    const structure = {}
    while (true) {
        const fieldName = consoleInput("Input field name: ")
        if (fieldName === "END") { break }

        const fieldType = consoleInput("Input field type: ")
        if (fieldType === "END") { break }

        structure[fieldName] = fieldType
        process.stdout.write("\n")
    }

    console.clear()
    console.time("Generation time")
    process.stdout.write("Generator Started: \n")
    await createSqlFile(structure, rowsAmount, tableName, outFileName)
    console.timeEnd("Generation time")
}

main()