const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

const { handleBotError } = require("../../handlers/error");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Timeout an user")
        .addUserOption((option) => option.setName("user").setDescription("User").setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addNumberOption((option) =>
            option.setName("duration").setDescription("Timeout duration in minutes").setRequired(true)
        )
        .addStringOption((option) => option.setName("reason").setDescription("Reason").setRequired(true)),
    async execute(client, interaction) {
        const target = interaction.options.getUser("user");
        const user = await interaction.guild.members.fetch(target.id);
        let time = interaction.options.getNumber("duration");

        console.log(interaction);

        if (user.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(":ringed_planet: - Timeout")
                        .setColor("#ff0000")
                        .setDescription(`You can't take action on <@${user.id}> since they have a higher role.`),
                ],
            });

        try {
            await user.timeout(time * 60 * 1000, interaction.options.getString("reason"));

            target.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(":ringed_planet: - Timeout")
                        .setColor("0x8e44ad")
                        .setDescription(
                            `You have been timed out from the **${
                                interaction.member.guild.name
                            }** Discord. \n Reason: **${interaction.options.getString("reason")}**`
                        ),
                ],
            });

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(":ringed_planet: - Timeout")
                        .setColor("0x8e44ad")
                        .setDescription(
                            `<@${
                                target.id
                            }> has been timed out from the Discord. \n Reason: **${interaction.options.getString(
                                "reason"
                            )}**`
                        ),
                ],
            });
        } catch (err) {
            handleBotError(client, "Timeout", interaction.member.guild, interaction.user, err);
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(":ringed_planet: - Timeout")
                        .setColor("#ff0000")
                        .setDescription(
                            `I'm not able to timeout <@${target.id}>. A message was already sent to our developers`
                        ),
                ],
            });
        }
    },
    usage: "/timeout <user> <reason>",
};