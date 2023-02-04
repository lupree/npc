const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder().setName('kick').setDescription('Kick an user')
        .addUserOption(option => option.setName('user').setDescription('User').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addStringOption(option => option.setName('reason').setDescription('Reason').setRequired(true)),
    async execute(client, interaction) {
        const target = interaction.options.getUser('user');
        var imgSad = "https://media.giphy.com/media/Y4z9olnoVl5QI/giphy.gif"
        const user = await interaction.guild.members.fetch(target.id)

        if(user.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle(':ringed_planet: - Kick')
                    .setColor('#ff0000')
                    .setDescription(`You can't take action on <@${user.id}> since they have a higher role.`)
                ]
        
            })

        try {
            await user.kick({ reason: interaction.options.getString('reason') })
   
            target.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle(':ringed_planet: - Kick')
                    .setColor('0x8e44ad')
                    .setDescription(`You have been kicked from the **${interaction.member.guild.name}** Discord. \n Reason: **${interaction.options.getString('reason')}**`)
                    .setImage(imgSad)
                ], ephemeral: true
            })
    
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle(':ringed_planet: - Kick')
                    .setColor('0x8e44ad')
                    .setDescription(`<@${target.id}> has been kicked from the Discord. \n Reason: **${interaction.options.getString('reason')}**`)
                ], ephemeral: true
            })

        } catch (err) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle(':ringed_planet: - Kick')
                    .setColor('#ff0000')
                    .setDescription(`I'm not able to kick <@${target.id}>.`)
                ], ephemeral: true
            })
        }
    },
    usage: "/kick <user> <reason>"
}