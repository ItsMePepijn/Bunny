const Discord = require('discord.js');
const db =  require('quick.db');
 
module.exports = {
    name: 'unmute',
    description: 'unmutes an user',
    async execute(message, args, client){
        const guild = client.guilds.cache.get("863732935035060264");
        const muterole = guild.roles.cache.get('897820144833798224');
        const logs = guild.channels.cache.get('864535338977591326');
        const embed = new Discord.MessageEmbed();
        const pfx = db.get('prefix');
        if(message.member.permissions.has('ADMINISTRATOR') || message.member.permissions.has('MANAGE_MESSAGES')){
            const target = message.mentions.users.first();
            const user = message.mentions.members.first();
            if(user){
                if(user.roles.cache.has('897820144833798224')){
                    embed.setTitle(`${target.tag} has been unmuted!`)
                    embed.setDescription(`**By:** ${message.member}`)
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    user.roles.remove(muterole)
                    db.delete(`member_${target.id}.mutedtime`);
                    db.delete(`member_${target.id}.mutedreason`);
                    message.channel.send({embeds: [embed] });
                    console.log('Embed sent');
                }
                else{
                    embed.setTitle('Error')
                    embed.setDescription('This user is not muted!')
                    embed.setColor("#ECBCD7")
                    embed.setTimestamp()
                    message.channel.send({embeds: [embed] });
                    console.log('Embed sent');
                }
            }
            else{
                embed.setTitle(`Command: ${pfx}unmute`)
                embed.setDescription(`**Description:** unmutes a member\n**Usage:** ${pfx}unmute [user]\n**Example:** ${pfx}unmute noobmaster69`)
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