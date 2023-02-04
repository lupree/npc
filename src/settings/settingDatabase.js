const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "185.245.61.130",
    port: 3307,
    user: "root",
    password: "WKoHTB70NmWCQJpW7xMh",
    database: "settings",
});

connection.connect(function (err) {
    if (err) return console.log(`Connecting to Settings database...`, "failed".red);
    console.log(`Connecting to Settings database...`, "success".green);
});

module.exports = {};