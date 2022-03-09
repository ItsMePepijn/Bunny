const fs = require('fs');
const chalk = require('chalk')
const {client} = require('./client')

function setEvents() {
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        console.log(chalk.green('[EVENT HANDLER]') + ` - ${file} has been loaded`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
    console.log(' ')
}

module.exports = {
    setEvents
}