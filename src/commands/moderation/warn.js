const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('test command')
        .addUserOption((option) => option.setName("user").setDescription("User").setRequired(true))
        .addStringOption((option) => option.setName("reason").setDescription("Reason").setRequired(true).addChoices({name: 'Spam', value: 'Spam'}, {name: 'Hatespeech', value: 'Hatespeech'}, {name: 'Racism', value: 'Racism'})),
    async execute(client, interaction) {
        const warnedUser = interaction.options.getUser("user")
        const warnLogChannel = client.channels.cache.get("1158768035906199633")
        const warnEmbed = new EmbedBuilder()
        .setTitle(`${interaction.user.username} warned ${warnedUser.username}`)
        .setColor(0x800000)
        .setTimestamp(new Date)
        .setThumbnail(await warnedUser.displayAvatarURL())
        .setDescription(` **Username** ${warnedUser} \n **Reason:** ${interaction.options.getString("reason")}`)
        console.log(interaction.user.username + " warned " + warnedUser + " for the following reason:")
        console.log(interaction.options.getString("reason"))

        const userEmbed = new EmbedBuilder()
        .setTitle(`**You were warned!**`)
        .setColor(0x800000)
        .setTimestamp(new Date)
        .setDescription(`**Reason:** ${interaction.options.getString("reason")} \n If you get 1 more warning in the next 4 Weeks, you will be banned from the server`)
        warnedUser.send({embeds: [userEmbed]})

        if(interaction.channel.id !== warnLogChannel.id){
            warnLogChannel.send({embeds: [warnEmbed]})
            const replyEmbed = new EmbedBuilder()
            .setTitle(`Successfully Warned ${warnedUser}`)
            .setColor("008000")

            interaction.reply({embeds: [replyEmbed], ephemeral: true})
        }
        else{
            interaction.reply({embeds: [warnEmbed]})
        }        
    }
}