const db = require('quick.db');
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

//On ready
client.on('ready', () => {
    console.log(client.user.tag + ' Has logged in!');
    client.user.setActivity('my master', { type: 'LISTENING' });
});

//Config setup
const { prefix, token } = require ('./config.json');
db.set('prefix', prefix)

//Commands setup
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Command handler
client.on('message', message => {
    const pfx = db.get('prefix');
    if (!message.content.startsWith(pfx) || message.author.bot || !message.guild) return;
    const args = message.content.slice(pfx.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    const file = client.commands.get(command);
    if(file) file.execute(message, args, client);
});

//membercount channel
function MemberCount(){
    const channel = client.channels.cache.find(channel => channel.id === '863825218349694996');
    const guild = client.guilds.cache.find(guild => guild.id === "863732935035060264");
    if (!channel) return;
    channel.setName(`୨・${guild.memberCount}`);
    console.log('Updated membercount');
}
setInterval(MemberCount, 60000)

client.login(token);