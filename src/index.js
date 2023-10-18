require("dotenv").config()
const colors = require("colors");
const fs = require("fs")
const { Client, Collection, GatewayIntentBits } = require("discord.js")
const database = require("./handlers/database");
const tempChannels = new Collection()

const client = new Client({
    intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates],
})

client.commands = new Collection()

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 

commandFiles.forEach((commandFile) => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})

console.log(`Discord.JS Version: ${require("discord.js/package.json").version}`.blue + "\n")
console.log(`Starting npc...`.yellow);

database.createTable("TMP_CHANNELS", "ChannelId varchar(255), GuildId varchar(255)")
database.createTable("GUILDS", "GuildId varchar(255), Name varchar(255)")

require('./handlers/events')(client);
require('./handlers/commands')(client);
require('./handlers/tempchannels')(client);

client.login(process.env.TOKEN);

require('./handlers/daily')(client);