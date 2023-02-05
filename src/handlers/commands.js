const fs = require('fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const commands = []
require("dotenv").config()

module.exports = client => {    
    console.log(`Loading Commands...`.yellow)
    fs.readdirSync('./src/commands/').forEach(dir => {
        var files = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js"));

        for (let file of files) {
            const command = require(`../commands/${dir}/${file}`);

            if(!file.includes('.ignore')) {
                if(command.data) {
                    commands.push(command.data.toJSON());
                    command.data.category = dir;
                    command.data.usage = command.usage;
                    client.commands.set(command.data.name, command)

                    console.log(`${dir}/${file}...`, "ready".green);
                } else {
                    console.log(`${dir}/${file}...`, "uncomplete configuration ".red);
                }
            }
        }
    });

    const rest = new REST( { version: '9' } ).setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log('Starting refreshing application (/) commands...'.yellow);
            
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands },
            ).then(console.log('Successfully reloaded application (/) commands.'.green))
            
        } catch (error) {
            console.log('Failed to refresh application (/) commands...'.red);
            console.error(error);
        }
    })();
}