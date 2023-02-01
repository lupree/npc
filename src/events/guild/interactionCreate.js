const fs = require("fs");
const { InteractionType, EmbedBuilder } = require("discord.js")
const client = require("discord.js")

module.exports = {
    name: "interactionCreate",
    once: false,
    run: async (interaction, client) => {
        if (interaction.isChatInputCommand) {
            fs.readdirSync("./src/commands/").forEach(dir => {
                var files = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js"));
                for (let file of files) {
                    if(!file.includes(".ignore")) {
                        const pull = require(`../../commands/${dir}/${file}`);
                        if(pull.data.toJSON()['name'] == interaction.commandName) {
                            pull.execute(client, interaction);
                        }   
                    }         
                }
            })
        }
    },
};