const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "guildCreate",
    once: false,
    run: async (guild, client) => {
        const ownerEmbed = new EmbedBuilder()
        .setTitle("npc - new guild")
        .setColor(0x800000)
        .setTimestamp(new Date)
        .setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`)
        .setDescription(` **Guild Name** ${guild.name} \n **Guild ID:** ${guild.id} \n **Guild Owner**: <@${guild.ownerId}> `)
    
        const channel = client.channels.cache.get("1070302765953331201")
        channel.send({embeds: [ownerEmbed]})
    },
};