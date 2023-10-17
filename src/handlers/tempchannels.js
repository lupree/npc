const database = require("./database");

module.exports = client => {
    client.on('voiceStateUpdate', (oldState, newState) => {
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        if(newChannel){
            if(newChannel.id == '1163473099568730122'){
                const user = newState.member;
                const guild = user.guild;
    
                const createdChannel = guild.channels.create({
                    name: `⌛ ${user.displayName}'s Channel`,
                    type: '2',
                    parent: '1163474315690381404',
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: ['ViewChannel', 'Connect', 'KickMembers', "ManageChannels", 'ModerateMembers', 'MuteMembers']
                        },
                        {
                            id: guild.id,
                            allow: ['ViewChannel', 'Connect']
                        }
                    ],
                    userLimit: 5,
                }).then(channel => {
                    user.voice.setChannel(channel.id);
                    console.log(`${newState.member.user.tag}'s Voice State changed`);
                    console.log(`${newState.member.user.tag} was moved to Channel: ${channel.id}`)
                    database.createTmpChannel(channel.id, guild.id)
                })
            }
        }
        if(oldChannel){
            $tmpChannels = database.getTmpChannels(oldChannel.guild.id, function (callback) {
                callback.forEach((channel) => {
                    if(channel.ChannelId === oldChannel.id){
                        oldChannel.delete()
                        database.deleteTmpChannel(oldChannel.id)
                    }
                })
            })
        }
    })    
}