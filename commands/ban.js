const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'ban',
    description: 'Bans the specified user',
    isStaff: true,
    execute(message, args, guild){
        const logs = guild.channels.cache.find(channel => channel.id === db.get('channels.logs.ban'));
        const embed = new discord.MessageEmbed
        const pfx = db.get('prefix');
        if(message.member.permissions.has('BAN_MEMBERS') || message.member.permissions.has('ADMINISTRATOR')){
            const member = message.mentions.members.first()
            if(member){
                if(member.permissions.has('BAN_MEMBERS') || member.permissions.has('ADMINISTRATOR')){
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
                    embed.setTitle(`${member.user.tag} has been banned!`, member.user.displayAvatarURL())
                    embed.setDescription('**Reason:** ' + banreason + '\n**By:** <@' + message.member + '>')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    member.ban({
                        days: 0,
                        reason: banreason
                    });
                    console.log(`Banned ${member.user.tag} for ${banreason}`)
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
