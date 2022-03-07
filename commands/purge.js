const Discord = require('discord.js');
const db = require('quick.db');
 
module.exports = {
    name: 'clear',
    description: 'Mass delete messages',
    isStaff: true,
    execute(message, args, guild){
        const logs = guild.channels.cache.find(channel => channel.id === '864535338977591326');
        const pfx = db.get('prefix');
        const embed = new Discord.MessageEmbed()
        if(message.member.permissions.has('MANAGE_MESSAGES') || message.member.permissions.has('ADMINISTRATOR')){
            const messages = args[0]
            if(!messages){
                embed.setTitle(`Command: ${pfx}clear`)
                embed.setDescription(`**Description:** Purge messsages\n**Usage:** ${pfx}clear [amount of messages \`1 - 100\`]\n**Example:** ${pfx}clear 21`)
                embed.setColor("#ECBCD7")
                embed.setTimestamp()
                message.channel.send({embeds: [embed] });
                console.log('Embed sent');
            }
            else{
                if(isNaN(messages)){
                    embed.setTitle('Error')
                    embed.setDescription('That is not a number!')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    message.channel.send({embeds: [embed] });
                    console.log('Embed sent');
                }
                else{
                    if(parseInt(messages) > 100){
                        embed.setTitle('Error')
                        embed.setDescription('You must choose an amount of messages between \`1\` and \`100\`')
                        embed.setColor("#ECBCD7")
                        embed.setTimestamp()
                        message.channel.send({embeds: [embed] });
                        console.log('Embed sent');
                    }
                    else{
                        if(messages === '1'){
                            var msg = ('message')
                        } else{
                            var msg = ('messages')
                        }
                        embed.setAuthor(`Deleted ${messages} ${msg}!`)
                        embed.setDescription(`**Amount:** ${messages}\n**In:** <#${message.channel.id}>\n**By:** ${message.member}`)
                        embed.setColor("#ECBCD7")
                        embed.setTimestamp()
                        message.channel.bulkDelete(messages, true)
                        message.channel.send({embeds: [embed] });
                        logs.send({embeds: [embed] });
                        console.log('Embed sent');
                        console.log(`Deleted ${messages} messages in ${message.channel.name}`)
                    }
                }
            }
        }
        else {
            embed.setTitle('Error')
            embed.setDescription('You do not have the required permissions!')
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
            message.channel.send({embeds: [embed] });
            console.log('Embed sent');
        }
    }
}