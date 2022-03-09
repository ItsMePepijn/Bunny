const Discord = require('discord.js');
const db =  require('quick.db');
var moderation = new db.table('moderation');
 
module.exports = {
    name: 'warn',
    description: 'warns a member',
    isStaff: true,
    execute(message, args){
        const warnlogs = message.guild.channels.cache.get(db.get('channels.logs.warns'));
        const embed = new Discord.MessageEmbed()
        embed.setColor(db.get('embedColor'))
        embed.setTimestamp()
        const pfx = db.get('prefix');
        if(message.member.permissions.has('MANAGE_MESSAGES') || message.member.permissions.has('ADMINISTRATOR')){
            const target = message.mentions.users.first();
            if(target){
                if(args.length === 1){
                    var warnreason = ('None')
                }else{
                    var warnreason = (args.slice(1).join(' '))
                }
                embed.setTitle(`${target.tag} has been warned!`)
                embed.setDescription(`**By:** ${message.member}\n**Reason:** ${warnreason}`)
                moderation.add(`member_${target.id}.infractions`, 1);
                console.log(`${target.tag} has been warned`)
                console.log(`${target.tag} now has ${moderation.get(`member_${target.id}.infractions`)} infractions`)
                message.channel.send({embeds: [embed] });
                warnlogs.send({embeds: [embed]})
                console.log('Embed sent');
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