const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lul')
        .setDescription('Description'),
    async execute(client, interaction) {
        console.log(interaction)
        interaction.reply("lul");
    }
}