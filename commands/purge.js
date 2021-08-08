const Discord = require('discord.js');
const db = require('quick.db');
 
module.exports = {
    name: 'clear',
    description: 'Mass delete messages',
    execute(message, args, guild){
        const logs = guild.channels.cache.find(channel => channel.id === '864535338977591326');
        const pfx = db.get('prefix');
        const embed = new Discord.MessageEmbed()
        if(message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR')){
            const messages = args[0]
            if(!messages){
                embed.setTitle(`Command: ${pfx}clear`)
                embed.setDescription(`**Description:** Purge messsages\n**Usage:** ${pfx}clear [amount of messages \`1 - 99\`\n**Example:** ${pfx}clear 20`)
                embed.setColor("#ECBCD7")
                embed.setTimestamp()
                message.channel.send(embed);
                console.log('Embed sent');
            }
            else{
                if(isNaN(messages)){
                    embed.setTitle('Error')
                    embed.setDescription('That is not a number!')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    message.channel.send(embed);
                    console.log('Embed sent');
                }
                else{
                    if(parseInt(messages) > 99){
                        embed.setTitle('Error')
                        embed.setDescription('You must choose an amount of messages between \`1\` and \`99\`')
                        embed.setColor("#ECBCD7")
                        embed.setTimestamp()
                        message.channel.send(embed);
                        console.log('Embed sent');
                    }
                    else{
                        embed.setAuthor(`Deleted ${messages} messages!`)
                        embed.setDescription(`**Amount:** ${messages}\n**In:** <#${message.channel.id}>\n**By:** ${message.member}`)
                        embed.setColor("#ECBCD7")
                        embed.setTimestamp()
                        message.channel.bulkDelete(messages)
                        message.channel.send(embed);
                        logs.send(embed);
                        console.log('Embed sent');
                        console.log(`Deleted ${messages} messages in ${message.channel.name}`)
                    }
                }
            }
        }
        else {
            embed.setTitle('Error')
            embed.setDescription('You do not have the requiring permissions!')
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
            message.channel.send(embed);
            console.log('Embed sent');
        }
    }
}