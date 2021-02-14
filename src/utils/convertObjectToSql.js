function convertObjectToSql(item, tableName) {
    const keys = Object.keys(item)

    let sqlString = `INSERT INTO ${tableName} (`
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
    sqlString += ");"

    return sqlString
}

module.exports = convertObjectToSql