const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('test command'),
    async execute(client, interaction) {
        interaction.reply(`test successful <@${interaction.user.id}>`);
        console.log(interaction.user)
    }
}
