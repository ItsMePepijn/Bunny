const Discord = require('discord.js');
const db =  require('quick.db');
 
module.exports = {
    name: 'setwarnings',
    description: 'set the warns of a member',
    isStaff: true,
    execute(message, args, client){
        const guild = client.guilds.cache.get("863732935035060264");
        const logs = guild.channels.cache.get('864535338977591326');
        const embed = new Discord.MessageEmbed
        const pfx = db.get('prefix');
        if(message.member.permissions.has('MANAGE_MESSAGES') || message.member.permissions.has('ADMINISTRATOR')){
            const target = message.mentions.users.first();
            if(target){
                var warnsraw = args[1]
                if(isNaN(warnsraw)){
                    embed.setTitle('Error')
                    embed.setDescription('That is not a number!')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    message.channel.send({embeds: [embed] });
                    console.log('Embed sent');
                }
                else{
                    if(args.length === 2){
                        var warnreason = ('None')
                    }else{
                        var warnreason = (args.slice(2).join(' '))
                    }
                    var warns = Math.round(warnsraw)
                    embed.setTitle(`${target.tag} warns have been set to ${warns}`)
                    embed.setDescription(`**By:** ${message.member}\n**Reason:** ${warnreason}`)
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    db.set(`member_${target.id}.infractions`, parseInt(warns));
                    console.log(`${target.tag}\'s warns have been edited`)
                    console.log(`${target.tag} now has ${db.get(`member_${target.id}.infractions`)} infractions`)
                    message.channel.send({embeds: [embed] });
                    console.log('Embed sent');
                }
            }
            else{
                embed.setTitle(`Command: ${pfx}warn`)
                embed.setDescription(`**Description:** Warns a member\n**Usage:** ${pfx}warn [user] [resason]\n**Example:** ${pfx}warn noobmaster69 not very poggers`)
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
    }
}