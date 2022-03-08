const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'kick',
    description: 'Kicks the specified user',
    isStaff: true,
    execute(message, args){
        const logs = message.guild.channels.cache.get(db.get('channels.logs.kick'));
        const embed = new discord.MessageEmbed()
        embed.setColor(db.get('embedColor'))
        embed.setTimestamp()
        const pfx = db.get('prefix');
        if(message.member.permissions.has('KICK_MEMBERS') || message.member.permissions.has('ADMINISTRATOR')){
            const member = message.mentions.members.first()
            if(member){
                if(member.permissions.has('BAN_MEMBERS') || member.permissions.has('ADMINISTRATOR') || member.permissions.has('KICK_MEMBERS')){
                    embed.setTitle('Error')
                    embed.setDescription('I can\'t kick this user!')
                    message.channel.send({embeds: [embed] });
                    console.log('Embed sent');
                }
                else {
                    if(args.length === 1){
                        var reason = ('None')
                    }else{
                        var reason = (args.slice(1).join(' '))
                    }
                    embed.setTitle(`${member.user.tag} has been kicked!`, member.user.displayAvatarURL())
                    embed.setDescription(`**By:** <@${message.member}>\n**Reason:** ${reason}`)
                    member.kick(reason);
                    console.log(`Kicked ${member.user.tag} for ${reason}`)
                    message.channel.send({embeds: [embed] });
                    logs.send({embeds: [embed] });
                    console.log('Embed sent');
                }
            } else{
                embed.setTitle(`Command: ${pfx}kick`)
                embed.setDescription(`**Description:** Kick a member\n**Usage:** ${pfx}kick [user] [reason]\n**Example:** ${pfx}kick noobmaster69  not cool`)
                message.channel.send({embeds: [embed] });
                console.log('Embed sent');    
            }
        }
        else {
            embed.setTitle('Error')
            embed.setDescription('You do not have the required permissions!')
            message.channel.send({embeds: [embed] });
            console.log('Embed sent');
        }
    }
}