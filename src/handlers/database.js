const { channelLink } = require("discord.js");
const mysql = require("mysql");
require("dotenv").config()

var connection = mysql.createConnection({
    host: "lupree-p1-mysql-npcdb-01.mysql.database.azure.com",
    port: 3306,
    user: "lupree_p1_myssql_root",
    password: process.env.DB_PASSWORD,
    database: "lupree-p1-mysql-npcdb-01",
    ssl: true
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

    createRow(table, data) {
        connection.query(`INSERT INTO ${table} VALUES ${data}`)
    },

    createTmpChannel(channelId, serverId) {
        connection.query(
            `INSERT INTO TMP_CHANNELS VALUES (${channelId}, ${serverId})`,
            function (error, results, fields) {}
        );
    },

    deleteTmpChannel(channelId) {
        connection.query(
            `DELETE FROM TMP_CHANNELS WHERE ChannelId=${channelId}`,
            function (error, results, fields) {}
        );
    },

    getTable(name, primary, content, callback) {
        connection.query(`SELECT ${content} FROM ${name} WHERE ID=${primary}`, function (error, results, fields) {
            return callback(results[0][content]);
        });
    },

    getTmpChannels(guildId, callback) {
        connection.query(`SELECT * FROM TMP_CHANNELS WHERE GuildId=${guildId}`, function (error, results, fields) {
            return callback(results)
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