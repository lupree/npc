require("dotenv").config()
const fs = require("fs")
const { Client, Collection, GatewayIntentBits } = require("discord.js")

const client = new Client({
    intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages]
})

client.commands = new Collection()

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 

commandFiles.forEach((commandFile) => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})

const logo = require("./utils/logo.txt");

async function init() {
    console.log(`${logo}`.blue);
    console.log(`Discord.JS Version: ${require("discord.js/package.json").version}`.blue + "\n")
    console.log(`Starting Saturn...`.yellow);

    require('./handlers/events')(client);
    require('./handlers/commands')(client);
    client.login(process.env.TOKEN);
}
