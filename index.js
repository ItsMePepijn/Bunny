const {client} = require('./modules/client')

//Commands setup
const {setCommands} = require('./modules/commandSetup')
setCommands()

//Events setup
const {setEvents} = require('./modules/eventSetup')
setEvents()

const {token} = require('./config.json');
client.login(token);