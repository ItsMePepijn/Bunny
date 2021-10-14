const Discord = require('discord.js');
const db =  require('quick.db');

module.exports = {
    name: 'mutestatus',
    description: 'shows the mutestatus of the mentioned member',
    execute(message){
        const target = message.mentions.users.first();
        const user = message.mentions.members.first();
        const embed = new Discord.MessageEmbed();
        if(user){
            if(user.roles.cache.has('897820144833798224')){
                const time = Math.round(db.get(`member_${target.id}.mutedtime`) / 1000);
                const reason = db.get(`member_${target.id}.mutedreason`);
                embed.setTitle(`${target.tag}\'s mute-status:`)
                embed.setDescription(`**Reason:** ${reason}\n**Untill:** <t:${time}:f>\n**Time untill unmute:** <t:${time}:R>`)
                embed.setColor("#ECBCD7")
                embed.setTimestamp()
                message.channel.send({embeds: [embed] });
                console.log('Embed sent');
            }
            else{
                embed.setTitle('Error')
                embed.setDescription('This member is not muted!')
                embed.setColor("#ECBCD7")
                embed.setTimestamp()
                message.channel.send({embeds: [embed] });
                console.log('Embed sent');
            }
        }
        else{
            embed.setTitle(`Command: ${pfx}mutestatus`)
            embed.setDescription(`**Description:** Shows information about the muted member\n**Usage:** ${pfx}mutesatus [user]\n**Example:** ${pfx}mutestatus noobmaster69`)
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
            message.channel.send({embeds: [embed] });
            console.log('Embed sent');  
        }
    }
}