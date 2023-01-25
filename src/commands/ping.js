const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Description'),
    async execute(interaction) {
        await interaction.reply("lul");
    }
}