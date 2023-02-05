module.exports = {
        name: "ready",
        once: true,
        run: async (client) => {
            console.log(`Authenticate as ${client.user.tag}...`, "success".green)
            console.log(`Bot active on ${client.guilds.cache.size} guild(s)`);
        },
    };