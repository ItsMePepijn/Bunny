const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'ban',
    description: 'Bans the specified user',
    execute(message, args, guild){
        const logs = guild.channels.cache.find(channel => channel.id === '864535338977591326');
        const embed = new discord.MessageEmbed
        const pfx = db.get('prefix');
        if(message.member.permissions.has('BAN_MEMBERS') || message.member.permissions.has('ADMINISTRATOR')){
            const user = message.mentions.members.first()
            const target = message.mentions.users.first()
            if(user){
                if(user.permissions.has('BAN_MEMBERS') || user.permissions.has('ADMINISTRATOR')){
                    embed.setTitle('Error')
                    embed.setDescription('I can\'t ban this user!')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    message.channel.send({embeds: [embed] });
                    console.log('Embed sent');
                }
                else {
                    if(args.length === 1){
                        var banreason = ('None')
                    }else{
                        var banreason = (args.slice(1).join(' '))
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
                    message.channel.send({embeds: [embed] });
                    logs.send({embeds: [embed] });
                    console.log('Embed sent');
                }
            } else{
                embed.setTitle(`Command: ${pfx}ban`)
                embed.setDescription(`**Description:** Ban a member\n**Usage:** ${pfx}ban [user] [reason]\n**Example:** ${pfx}ban noobmaster69 not cool`)
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
