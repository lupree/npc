const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('send').setDescription('Send Message to User')
    .addUserOption(option => option.setName('user').setDescription('User').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option => option.setName('message').setDescription('Message').setRequired(true)),
    async execute(client, interaction) {
        const target = interaction.options.getUser('user');
        const user = await interaction.guild.members.fetch(target.id)

        try{
            target.send({
                embeds: [
                    new EmbedBuilder()
                    .setColor('0x800000')
                    .setDescription(`${interaction.options.getString('message')}`)
                ], ephemeral: true
            })
            

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor('0x800000')
                    .setTitle(`Sent message to @${user.id}`)
                    .setDescription(`**Message:** ${interaction.options.getString('message')}`)
                ], ephemeral: true
            })
        }
        catch{
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor('0x800000')
                    .setDescription(`There was an Error while sending the Message to @${user.id}`)
                ], ephemeral: true
            })
        }
        
    }
}