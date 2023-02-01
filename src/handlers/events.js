const {readdirSync} = require('fs');
module.exports = client => {
    console.log(`Loading Events...`.yellow)
    readdirSync('./src/events/').forEach(dir => {
        var files = readdirSync(`./src/events/${dir}`).filter(file => file.endsWith('.js'));

        for (let file of files) {
            const eventFunction = require(`../events/${dir}/${file}`);
            if (eventFunction.disabled) return;

            const event = eventFunction.name;
            const emitter =
                (typeof eventFunction.emitter === 'string'
                    ? client[eventFunction.emitter]
                    : eventFunction.emitter) || client;
            const once = eventFunction.once;

            try {
                emitter[once ? 'once' : 'on'](event, (...args) =>
                    eventFunction.run(...args, client),
                );
            }
            catch (error) {
                console.error(error.stack);
            }
            console.log(`${dir}/${event}.js...`, "ready".green);

        }
    });
}