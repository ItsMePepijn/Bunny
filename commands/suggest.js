const Discord = require('discord.js');
 
module.exports = {
    name: 'suggest',
    description: 'make a suggestion',
    execute(message, args){
        const embed =  new Discord.MessageEmbed();
        const embed2 = new Discord.MessageEmbed();
        const suggest = message.guild.channels.cache.get(db.get('channels.suggestions'))
        if(message.channel.id == db.get('channels.logs.suggestions')){
            if(!args.length == 0){
                embed.setTitle('Thank you for making a suggestion!')
                embed.setDescription('Your suggestion will be reviewed as soon as posssible')
                embed.setColor("#ECBCD7")
                embed.setTimestamp()
                message.channel.send({embeds: [embed] })
                    .then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    });
                message.delete();

                embed2.setTitle('New suggestion!');
                embed2.setDescription(`**by:** ${message.member}\n**Suggestion:** ${message.content.slice(8)}`)
                embed2.setColor("#ECBCD7")
                embed2.setTimestamp()
                suggest.send({embeds: [embed2] });

                console.log('Embed sent');
            }
            else{
                embed.setTitle('Error')
                embed.setDescription('You have to make a suggestion!')
                embed.setColor("#ECBCD7")
                embed.setTimestamp()
                message.channel.send({embeds: [embed] })
                .then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                });
                message.delete()
                console.log('Embed sent');
            }
            
        }
        else{
            embed.setTitle('Error')
            embed.setDescription('You can only make suggestions in <#899636638681006080>!')
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
            message.channel.send({embeds: [embed] });
            console.log('Embed sent');
        }
    }
}