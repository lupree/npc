const { EmbedBuilder } = require("discord.js");

module.exports = {
  handleBotError(client, command, guild, executor, error) {
    const errorEmbed = new EmbedBuilder()
      .setTitle("npc - Command Error")
      .setColor(0x800000)
      .setTimestamp(new Date())
      .setDescription(
        `**An error has occurred in a command** \n \n **Command** ${command} \n **Executor** <@${executor.id}> (${executor.username}) \n **Guild** ${guild.name} \n \n **Error**: \n\`\`\` ${error} \`\`\`  `
      );

    const channel = client.channels.cache.get("1158372983254040576");

    channel.send({ embeds: [errorEmbed] });
  },
};