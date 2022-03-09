const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'interactionCreate',
    execute(interaction){
        if(interaction.isButton){
            if(interaction.customId == 'verify'){
                const memberole = interaction.guild.roles.cache.get(db.get('roles.member'));
                const verifylogs = interaction.guild.channels.cache.get(db.get('channels.logs.verify'));
                const chat = interaction.guild.channels.cache.get(db.get('channels.main'));
                const embed = new Discord.MessageEmbed();
                const embed2 = new Discord.MessageEmbed();
                if(!interaction.member.roles.cache.has(memberole.id)){
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