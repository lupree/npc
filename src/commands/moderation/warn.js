const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('test command')
        .addUserOption((option) => option.setName("user").setDescription("User").setRequired(true))
        .addStringOption((option) => option.setName("reason").setDescription("Reason").setRequired(true)),
    async execute(client, interaction) {
        interaction.reply(`successfully warned <@${interaction.options.getUser("user")}>`);
        console.log(interaction.user.username + " warned " + interaction.options.getUser("user") + " for the following reason:")
        console.log(interaction.options.getString("reason"))
    }
}
