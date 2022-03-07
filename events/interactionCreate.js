const Discord = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    execute(interaction){
        if(interaction.isButton){
            if(interaction.customId == 'verify'){
                const memberole = interaction.guild.roles.cache.get('898536580468334602');
                const verifylogs = interaction.guild.channels.cache.get('898538121908613121');
                const chat = interaction.guild.channels.cache.get('864532474398507048');
                const embed = new Discord.MessageEmbed();
                const embed2 = new Discord.MessageEmbed();
                if(!interaction.member.roles.cache.has('898536580468334602')){
                    interaction.deferUpdate();
                    interaction.member.roles.add(memberole);
                    embed.setTitle(`${interaction.user.tag} has veen verified!`);
                    embed.setDescription(`${interaction.member}\n<t:${Math.round(Date.now() / 1000)}:R>`);
                    embed.setFooter({text: `${interaction.member.id}`, iconURL: `${interaction.member.displayAvatarURL({format: 'png', dynamic: true})}`});
                    embed.setColor("#ECBCD7");
                    embed.setTimestamp();
    
                    embed2.setTitle('A new member appeared!');
                    embed2.setDescription(`Give ${interaction.member} a warm welcome!`);
                    embed2.setFooter({text: `${interaction.member.id}`, iconURL: `${interaction.member.displayAvatarURL({format: 'png', dynamic: true})}`});
                    embed2.setColor("#ECBCD7");
                    embed2.setTimestamp();
    
                    verifylogs.send({embeds: [embed] });
                    chat.send({embeds: [embed2] });
                    console.log('Embed sent');
                    console.log(`${interaction.user.tag} has veen verified!`)
                }else{
                    interaction.deferUpdate()
                }
            }
        }
    }
}