const Discord = require('discord.js');
const db =  require('quick.db');
const client = require('../modules/client')
var moderation = new db.table('moderation');
 
module.exports = {
    name: 'setwarnings',
    description: 'set the warns of a member',
    isStaff: true,
    execute(message, args){
        const guild = client.guilds.cache.get("863732935035060264");
        const logs = guild.channels.cache.get('864535338977591326');
        const embed = new Discord.MessageEmbed
        embed.setColor(db.get('embedColor'))
        embed.setTimestamp()
        const pfx = db.get('prefix');
        if(message.member.permissions.has('MANAGE_MESSAGES') || message.member.permissions.has('ADMINISTRATOR')){
            const target = message.mentions.users.first();
            if(target){
                var warnsraw = args[1]
                if(isNaN(warnsraw)){
                    embed.setTitle('Error')
                    embed.setDescription('That is not a number!')
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
                    moderation.set(`member_${target.id}.infractions`, parseInt(warns));
                    console.log(`${target.tag}\'s warns have been edited`)
                    console.log(`${target.tag} now has ${moderation.get(`member_${target.id}.infractions`)} infractions`)
                    message.channel.send({embeds: [embed] });
                    console.log('Embed sent');
                }
            }
            else{
                embed.setTitle(`Command: ${pfx}warn`)
                embed.setDescription(`**Description:** Warns a member\n**Usage:** ${pfx}warn [user] [resason]\n**Example:** ${pfx}warn noobmaster69 not very poggers`)
                message.channel.send({embeds: [embed] });
                console.log('Embed sent');
            }
        }
        else{
            embed.setTitle('Error')
            embed.setDescription('You do not have the required permissions!')
            message.channel.send({embeds: [embed] });
            console.log('Embed sent');
        }
    }
}