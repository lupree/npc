require("dotenv").config()
const colors = require("colors");
const fs = require("fs")
const { Client, Collection, GatewayIntentBits } = require("discord.js")
const database = require("./handlers/database");
const tempChannels = new Collection()

const client = new Client({
    intents:[GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates],
})

client.commands = new Collection()

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js')); 

commandFiles.forEach((commandFile) => {
    const command = require(`./commands/${commandFile}`)
    client.commands.set(command.data.name, command)
})

console.log(`Discord.JS Version: ${require("discord.js/package.json").version}`.blue + "\n")
console.log(`Starting npc...`.yellow);

client.on('voiceStateUpdate', (oldState, newState) => {
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;
    if(newChannel){
        if(newChannel.id == '973203175253352522'){
            const user = newState.member;
            const guild = user.guild;

            const createdChannel = guild.channels.create({
                name: `⌛ ${user.displayName}'s Channel`,
                type: '2',
                parent: '973203175253352520',
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
            })
            console.log(`${newState.member.user.tag}'s Voice State changed`);
        }
    }
    if(oldChannel){
        if(oldChannel.name.startsWith('⌛')){
            if(oldChannel.members.size === 0){
                oldChannel.delete()
            }
        }
    }
})

require('./handlers/events')(client);
require('./handlers/commands')(client);

client.login(process.env.TOKEN);