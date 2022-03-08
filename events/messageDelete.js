const db = require('quick.db');
const Discord = require('discord.js')
const embed = new Discord.MessageEmbed()
const {client} = require('../modules/client')


module.exports = {
    name: 'messageDelete',
    execute(message){
        if(!message.partial){
            if(message.author.bot) return
            if(message.channel.id == db.get('channels.verify')) return
            if(message.channel.id == db.get('channels.suggestions')) return
            const logs = client.channels.cache.get(db.get('channels.logs.message'));
            embed.setTitle('Deleted message:')
            embed.setDescription(`**Messsage:** ${message.content}\n**Sent by:** ${message.author}\n**In:** <#${message.channel.id}>`)
            embed.setColor('#ECBCD7')
            embed.setTimestamp()
            logs.send({embeds: [embed] })
        }
    }
}