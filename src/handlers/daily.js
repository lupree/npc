const cron = require('cron')

module.exports = client => {
    let getServerNames = new cron.CronJob('00 15 10 * * *', (client) => {
        console.log("Refreshing guild names in database".yellow) 
    })
}