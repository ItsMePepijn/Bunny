const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'tempban',
    description: 'Temporarily bans the specified user',
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
                    if(args[1] == '1' || args[1] == '2' || args[1] == '3' || args[1] == '4' || args[1] == '5' || args[1] === '6' || args[1] === '7'){
                        if(args.length === 2){
                            var banreason = ('None')
                        }else{
                            var banreason = (args.slice(2).join(' '))
                        }
                        var bandays = args[1]
                        embed.setTitle(`${target.tag} has been tempbanned!`, target.displayAvatarURL())
                        embed.setDescription('**Reason:** ' + banreason + '\n**Duration:** ' + bandays+ ' days\n**By:** <@' + message.member + '>')
                        embed.setColor("#ECBCD7")
                        embed.setTimestamp()
                        user.ban({
                            days: bandays,
                            reason: banreason
                        });
                        console.log(`Banned ${target.tag} for ${banreason}`)
                        message.channel.send(embed);
                        logs.send(embed);
                        console.log('Embed sent');
                    }
                    else{
                        embed.setTitle('Error')
                        embed.setDescription('You must specify an amount of days between \`1\` and \`7\`')
                        embed.setColor("#ECBCD7")
                        embed.setTimestamp()
                        message.channel.send(embed);
                        console.log('Embed sent');
                    }
                }
            } else{
                embed.setTitle(`Command: ${pfx}tempban`)
                embed.setDescription(`**Description:** Tempban a member\n**Usage:** ${pfx}tempban [user] [time in days \`1-7\`] [reason]\n**Example:** ${pfx}tempban noobmaster69 2 not cool`)
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