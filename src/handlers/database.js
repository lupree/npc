const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "srv1.lupree.com",
    port: 3306,
    user: "npc",
    password: "gXJG0MPfGOnVsghk57V$",
    database: "npc",
});

connection.connect(function (err) {
    if (err) return console.log(`Connecting to database...`, "failed".red);
    console.log(`Connecting to database...`, "success".green);
});

module.exports = {
    ownQuery(input, callback) {
        connection.query(input, function (error, results, fields) {
            return callback(results);
        });
    },

    ownQueryParse(input) {
        connection.query(input, function (error, results, fields) {});
    },

    createTable(content, contentValue) {
        connection.query(
            `CREATE TABLE IF NOT EXISTS ${content} (${contentValue})`,
            function (error, results, fields) {}
        );
    },

    createUser(name, id, content, contentVlaue) {
        connection.query(
            `INSERT INTO ${name} (\`ID\`, \`${content}\`) VALUES (${id}, ${contentVlaue})`,
            function (error, results, fields) {}
        );
    },

    getTable(name, primary, content, callback) {
        connection.query(`SELECT ${content} FROM ${name} WHERE ID=${primary}`, function (error, results, fields) {
            return callback(results[0][content]);
        });
    },

    editTable(name, primary, content, contentValue) {
        connection.query(
            `UPDATE ${name} SET ${content}=${contentValue} WHERE ID=${primary}`,
            function (error, results, fields) {
                //console.error(error)
            }
        );
    },
};