const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');
 
module.exports = {
    name: 'mute',
    description: 'mutes a user fr a certain amount of time',
    execute(message, args, client){
        const guild = client.guilds.cache.get("863732935035060264");
        const muterole = guild.roles.cache.get('897820144833798224');
        const logs = guild.channels.cache.get('864535338977591326');
        const embed = new Discord.MessageEmbed
        const pfx = db.get('prefix');
        if(message.member.permissions.has('MANAGE_MESSAGES') || message.member.permissions.has('ADMINISTRATOR')){
            const user = message.mentions.members.first();
            const target = message.mentions.users.first();
            if(user){
                if(user.permissions.has('BAN_MEMBERS') || user.permissions.has('ADMINISTRATOR') || user.permissions.has('KICK_MEMBERS') || user.permissions.has('MANAGE_ROLES')){
                    embed.setTitle('Error')
                    embed.setDescription('I can\'t mute this user!')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    message.channel.send({embeds: [embed] });
                    console.log('Embed sent');
                }
                else{
                    if(args[1]){
                        const raw = args[1];
                        const milliseconds = ms(raw);
                        if(isNaN(milliseconds)){
                            embed.setTitle('Error')
                            embed.setDescription('That is not a valid time!')
                            embed.setColor("#ECBCD7")
                            embed.setTimestamp()
                            message.channel.send({embeds: [embed] });
                            console.log('Embed sent');
                        } 
                        else if(milliseconds < 60000){
                            embed.setTitle('Error')
                            embed.setDescription('You have to mute for atleast one minute!')
                            embed.setColor("#ECBCD7")
                            embed.setTimestamp()
                            message.channel.send({embeds: [embed] });
                            console.log('Embed sent');
                        }
                        else{
                            if(args.length === 2){
                                var mutereason = ('None')
                            }else{
                                var mutereason = (args.slice(2).join(' '))
                            }
                            var timetotal = Date.now() + milliseconds
                            embed.setTitle(`${target.tag} has been muted for ${ms(milliseconds, { long: true})}!`)
                            embed.setDescription(`**Reason:** ${mutereason}\n**Duration:** ${ms(milliseconds, { long: true })}\n**By:** ${message.member}`)
                            embed.setColor("#ECBCD7")
                            embed.setTimestamp()
                            db.set(`member_${target.id}`, { username: `${target.tag}`, mutedtime: `${timetotal}`, mutedreason: `${mutereason}`});
                            user.roles.add(muterole);
                            message.channel.send({embeds: [embed] });
                            logs.send({embeds: [embed]});
                            console.log('Embed sent');
                        }
                    }
                    else{
                        embed.setTitle('Error')
                        embed.setDescription('You have to give me a time to mute them!')
                        embed.setColor("#ECBCD7")
                        embed.setTimestamp()
                        message.channel.send({embeds: [embed] });
                        console.log('Embed sent');
                    }
                }
            }
            else{
                embed.setTitle(`Command: ${pfx}mute`)
                embed.setDescription(`**Description:** Mutes a member for a specific time\n**Usage:** ${pfx}mute [user] [time] [resason]\n**Example:** ${pfx}mute noobmaster69 2h not very poggers`)
                embed.setColor("#ECBCD7")
                embed.setTimestamp()
                message.channel.send({embeds: [embed] });
                console.log('Embed sent');    
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