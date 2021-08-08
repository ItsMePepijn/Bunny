const Discord = require('discord.js');
 
module.exports = {
    name: 'av',
    description: 'returns a users avatar',
    execute(message){
        const embed = new Discord.MessageEmbed()
 
        if(!message.mentions.users.first()){
            embed.setTitle("Your Avatar:")
            embed.setImage(message.author.displayAvatarURL({ format: "png", dynamic: true }))
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
            message.channel.send(embed);
            console.log('Embed sent');
        }
        else{
            const user = message.mentions.users.first()
            embed.setTitle(`${user.tag}'s Avatar:`)
            embed.setImage(user.displayAvatarURL({ format: "png", dynamic: true }))
            embed.setColor('#ECBCD7')
            embed.setTimestamp()
            message.channel.send(embed);
            console.log('Embed sent');
        }
    }
}