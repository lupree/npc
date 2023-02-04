const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lul')
        .setDescription('test command'),
    async execute(client, interaction) {
        interaction.reply("lul");
    }
}