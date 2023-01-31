require("dotenv").config()
const fs = require("fs")
const { Client, Collection, InteractionType } = require("discord.js")

const client = new Client({intents:[]})
client.commands = new Collection()

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 

commandFiles.forEach((commandFile) => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})

client.once("ready", () => {
    
    console.log(`Ready! Logged in as ${client.user.tag}! I'm on ${client.guilds.cache.size} guild(s)!`)
    client.user.setActivity({name: "mit dem Code", type: "PLAYING"})
    
})

client.on("interactionCreate", async (interaction) => {
    if(interaction.type !== InteractionType.ApplicationCommand) return;

    if(interaction.commandName === 'ping'){
        await interaction.reply('ping');
    }
    if(interaction.commandName === 'lul'){
        await interaction.reply('lul');
    }
})

client.login(process.env.TOKEN)