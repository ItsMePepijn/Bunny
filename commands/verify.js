const Discord = require('discord.js');
const db =  require('quick.db');
 
module.exports = {
    name: 'verify',
    description: 'verifies the member and gives them the member role',
    execute(message){
        const memberole = message.guild.roles.cache.get('898536580468334602');
        const verifylogs = message.guild.channels.cache.get('898538121908613121');
        const chat = message.guild.channels.cache.get('864532474398507048');
        const embed = new Discord.MessageEmbed();
        const embed2 = new Discord.MessageEmbed();
        if(message.channel.id == '898537277599404034'){
            if(!message.member.roles.cache.has('898536580468334602')){
                message.member.roles.add(memberole);
                embed.setTitle(`${message.author.tag} has veen verified!`);
                embed.setDescription(`<t:${Math.round(Date.now() / 1000)}:R>`);
                embed.setFooter(`${message.member.id}`, `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`);
                embed.setColor("#ECBCD7");
                embed.setTimestamp();

                embed2.setTitle('A new member appeared!');
                embed2.setDescription(`Give ${message.member} a warm welcome!`);
                embed2.setFooter(`${message.member.id}`, `${message.author.displayAvatarURL({ format: "png", dynamic: true })}`);
                embed2.setColor("#ECBCD7");
                embed2.setTimestamp();

                verifylogs.send({embeds: [embed] });
                chat.send({embeds: [embed2] });
                console.log('Embed sent');
                console.log(`${message.author.tag} has veen verified!`)
                message.delete();
            }
            else {
                embed.setTitle('Error')
                embed.setDescription('You are already verified!')
                embed.setColor("#ECBCD7")
                embed.setTimestamp()
                message.channel.send({embeds: [embed] });
                console.log('Embed sent');
            }
        }
        else{ return }
    }
}