const Discord = require('discord.js');
const db = require('quick.db')
 
module.exports = {
    name: 'suggest',
    description: 'make a suggestion',
    execute(message, args){
        const embed =  new Discord.MessageEmbed();
        embed.setColor(db.get('embedColor'))
        embed.setTimestamp()
        const embed2 = new Discord.MessageEmbed();
        embed2.setColor(db.get('embedColor'))
        embed2.setTimestamp()
        const suggest = message.guild.channels.cache.get(db.get('channels.suggestions'))
        if(message.channel.id == db.get('channels.logs.suggestions')){
            if(!args.length == 0){
                embed.setTitle('Thank you for making a suggestion!')
                embed.setDescription('Your suggestion will be reviewed as soon as posssible')
                message.channel.send({embeds: [embed] })
                    .then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    });
                message.delete();

                embed2.setTitle('New suggestion!');
                embed2.setDescription(`**by:** ${message.member}\n**Suggestion:** ${message.content.slice(8)}`)
                suggest.send({embeds: [embed2] });

                console.log('Embed sent');
            }
            else{
                embed.setTitle('Error')
                embed.setDescription('You have to make a suggestion!')
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
            message.channel.send({embeds: [embed] });
            console.log('Embed sent');
        }
    }
}