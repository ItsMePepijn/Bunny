const Discord = require('discord.js');
const ms = require('ms');
const db = require('quick.db');

module.exports = {
	name: 'slowmode',
	description: 'Will set or remove the slowmode in a channel',
    isStaff: true,
	execute(message, args) {
        const logs = message.guild.channels.cache.find(channel => channel.id === '864535338977591326');
        const embed = new Discord.MessageEmbed
        const pfx = db.get('prefix');
        if(message.member.permissions.has('MANAGE_CHANNELS') || message.member.permissions.has('ADMINISTRATOR')){
            if(args[0]){
                const raw = args[0];
                const milliseconds = ms(raw);
                if(args[0] === 'remove'){
                    embed.setTitle('Removed slowmode')
                    embed.setDescription(`**In:** <#${message.channel.id}>\n**By:** ${message.member}`)
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    message.channel.setRateLimitPerUser(0);
                    console.log(`Removed slowmode in ${message.channel.name}`)
                    message.channel.send({embeds: [embed] });
                    logs.send({embeds: [embed] });
                    console.log('Embed sent');
                }
                else if(isNaN(milliseconds) || milliseconds < 1000 || milliseconds > 21600000){
                    embed.setTitle('Error')
                    embed.setDescription('That is not a valid time!')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    message.channel.send({embeds: [embed] });
                    console.log('Embed sent');
                }
                else{
                    embed.setTitle(`Set slowmode to ${ms(milliseconds, { long: true})}`)
                    embed.setDescription(`**New time** ${ms(milliseconds, { long: true})}\n**In:** <#${message.channel.id}>\n**By:** ${message.member}`)
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    message.channel.setRateLimitPerUser(milliseconds / 1000);
                    console.log(`Set slowmode in ${message.channel.name} to ${ms(milliseconds, { long: true})}`)
                    message.channel.send({embeds: [embed] });
                    logs.send({embeds: [embed] });
                    console.log('Embed sent');
                }
            }
            else{
                embed.setTitle(`Command: ${pfx}slowmode`)
                embed.setDescription(`**Description:** Set the slowmode in a channel\n**Usage:** ${pfx}slowmode [time] or "remove"\n**Example:** ${pfx}slowmode 10s\n${pfx}slowmode remove`)
                embed.setColor("#ECBCD7")
                embed.setTimestamp()
                message.channel.send({embeds: [embed] });
                console.log('Embed sent');
            }
        }
        else{
            embed.setTitle('Error')
            embed.setDescription('You do not have the required permissions!')
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
            message.channel.send({embeds: [embed] });
            console.log('Embed sent');
        }
	},
};