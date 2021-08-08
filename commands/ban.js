const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'ban',
    description: 'Bans the specified user',
    execute(message, args, guild){
        const logs = guild.channels.cache.find(channel => channel.id === '864535338977591326');
        const embed = new discord.MessageEmbed
        const pfx = db.get('prefix');
        if(message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')){
            const user = message.mentions.members.first()
            const target = message.mentions.users.first()
            if(user){
                if(user.hasPermission('ADMINISTRATOR') || user.hasPermission('KICK_MEMBERS') || user.hasPermission('BAN_MEMBERS')){
                    embed.setTitle('Error')
                    embed.setDescription('I can\'t ban this user!')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    message.channel.send(embed);
                    console.log('Embed sent');
                }
                else {
                    if(args.length === 2){
                        var banreason = ('None')
                    }else{
                        var banreason = (args.slice(2).join(' '))
                    }
                    embed.setTitle(`${target.tag} has been banned!`, target.displayAvatarURL())
                    embed.setDescription('**Reason:** ' + banreason + '\n**By:** <@' + message.member + '>')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    user.ban({
                        days: 0,
                        reason: banreason
                    });
                    console.log(`Banned ${target.tag} for ${banreason}`)
                    message.channel.send(embed);
                    logs.send(embed);
                    console.log('Embed sent');
                }
            } else{
                embed.setTitle(`Command: ${pfx}ban`)
                embed.setDescription(`**Description:** Ban a member\n**Usage:** ${pfx}ban [user] [reason]\n**Example:** ${pfx}ban noobmaster69 not cool`)
                embed.setColor("#ECBCD7")
                embed.setTimestamp()
                message.channel.send(embed);
                console.log('Embed sent');    
            }
        }
        else {
            embed.setTitle('Error')
            embed.setDescription('You do not have the required permissions!')
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
            message.channel.send(embed);
            console.log('Embed sent');
        }
    }
}