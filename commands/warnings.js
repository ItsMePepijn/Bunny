const Discord = require('discord.js');
const db =  require('quick.db');
 
module.exports = {
    name: 'warnings',
    description: 'returns the amount of warnings a user has',
    execute(message){
        const embed = new Discord.MessageEmbed()
        if(!message.mentions.users.first()){
            var infr = db.get(`member_${message.author.id}.infractions`)
            if(infr === null){
                var infractions = 0
            }
            else{
                var infractions = infr
            }
            embed.setTitle(`Your infractions:`)
            embed.setDescription(`${infractions}`)
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
            message.channel.send({embeds: [embed] });
            console.log('Embed sent');
        }
        else{
            const target = message.mentions.users.first();
            var infr = db.get(`member_${target.id}.infractions`)
            if(infr === null){
                var infractions = 0
            }
            else{
                var infractions = infr
            }
            embed.setTitle(`${target.tag} \'s infractions:`)
            embed.setDescription(`${infractions}`)
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
            message.channel.send({embeds: [embed] });
            console.log('Embed sent');
        }
    }
}