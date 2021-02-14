function sqlGenerator(items) {
    if (items.length === 0) { throw new Error("There are no items in generated schema items") }
    const keys = Object.keys(items[0])
    const sqlInsertArr = []
    for (const item of items) {
        let sqlString = "INSERT INTO tableName ("
        for (const key of keys) {
            sqlString += key + ", "
        }
        sqlString = sqlString.slice(0, sqlString.length - 2)
        sqlString += ") VALUES ("
        for (const value of Object.values(item)) {
            if (typeof value === "string") {
                sqlString += "'" + value + "', "
            } else {
                sqlString += value + ", "
            }
        }
        sqlString = sqlString.slice(0, sqlString.length - 2)
        sqlString += ")"
        sqlInsertArr.push(sqlString)

        
    }
    return sqlInsertArr
}

module.exports = sqlGenerator