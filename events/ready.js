const db = require('quick.db');
const Discord = require('discord.js')
const embed = new Discord.MessageEmbed()
const chalk = require('chalk')

module.exports = {
    name: 'ready',
    once: true,
    execute(client){
        console.log(chalk.greenBright(client.user.tag + ' Has logged in!'));
        client.user.setPresence({ activities: [{ name: 'all the cuties', type: 'WATCHING' }], status: 'dnd' });

        const logs = client.channels.cache.get(db.get('channels.logs.start'));
        embed.setTitle('Bot started!')
        embed.setColor('#ECBCD7')
        embed.setTimestamp()
        logs.send({embeds: [embed] })
    },
};