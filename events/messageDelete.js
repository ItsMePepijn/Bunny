const Discord = require('discord.js')
const embed = new Discord.MessageEmbed()
const {client} = require('../modules/client')


module.exports = {
    name: 'messageDelete',
    execute(message){
        if(!message.partial){
            if(message.author.bot) return
            if(message.channel.id == '899636638681006080') return
            if(message.channel.id == '898537277599404034') return
            const logs = client.channels.cache.find(channel => channel.id === '899603341812842527');
            embed.setTitle('Deleted message:')
            embed.setDescription(`**Messsage:** ${message.content}\n**Sent by:** ${message.author}\n**In:** <#${message.channel.id}>`)
            embed.setColor('#ECBCD7')
            embed.setTimestamp()
            logs.send({embeds: [embed] })
        }
    }
}