const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'kick',
    description: 'Kicks the specified user',
    execute(message, args, guild){
        const logs = guild.channels.cache.find(channel => channel.id === '864535338977591326');
        const embed = new discord.MessageEmbed
        const pfx = db.get('prefix');
        if(message.member.hasPermission('KICK_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')){
            const user = message.mentions.members.first()
            const target = message.mentions.users.first()
            if(user){
                if(user.hasPermission('ADMINISTRATOR') || user.hasPermission('KICK_MEMBERS') || user.hasPermission('BAN_MEMBERS')){
                    embed.setTitle('Error')
                    embed.setDescription('I can\'t kick this user!')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    message.channel.send(embed);
                    console.log('Embed sent');
                }
                else {
                    if(args.length === 1){
                        var reason = ('None')
                    }else{
                        var reason = (args.slice(1).join(' '))
                    }
                    embed.setAuthor(`${target.tag} has been kicked!`, target.displayAvatarURL())
                    embed.setDescription('**Reason:** ' + reason + '\n**For:** ' + time+ '\n**By:** <@' + message.member + '>')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    user.kick(reason);
                    console.log(`Kicked ${target.tag} for ${reason}`)
                    message.channel.send(embed);
                    logs.send(embed);
                    console.log('Embed sent');
                }
            } else{
                embed.setTitle(`Command: ${pfx}kick`)
                embed.setDescription(`**Description:** Kick a member\n**Usage:** ${pfx}kick [user] [reason]\n**Example:** ${pfx}kick noobmaster69  not cool`)
                embed.setColor("#ECBCD7")
                embed.setTimestamp()
                message.channel.send(embed);
                console.log('Embed sent');    
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