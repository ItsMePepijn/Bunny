const Discord = require('discord.js');
const db = require('quick.db');
 
module.exports = {
    name: 'muteloop',
    description: 'loops through every member in the guld and checks if it should be unmuted',
    execute(client){
        const guild = client.guilds.cache.get("863732935035060264");
        const logs = guild.channels.cache.get('864535338977591326');
        const muterole = guild.roles.cache.get('897820144833798224');
        const embed = new Discord.MessageEmbed()
        embed.setColor("#ECBCD7")
        embed.setTimestamp()
        guild.members.fetch().then(members => {
            members.forEach(member => {
                if(member.roles.cache.has(muterole.id)){
                    if(db.has(`member_${member.user.id}.mutedtime`)){
                        var time = db.get(`member_${member.user.id}.mutedtime`);
                        var check = time - Date.now()
                        if(check <= 0){
                            member.roles.remove(muterole);
                            db.delete(`member_${member.user.id}.mutedtime`);
                            db.delete(`member_${member.user.id}.mutedreason`)
                            console.log(`Unmuted ${member.user.tag}`);
                            embed.setTitle(`${member.user.tag} has been unmuted!`);
                            embed.setDescription(`**By:** <@${client.user.id}>\n**Reason:** Time expired`);
                            logs.send({embeds: [embed]});
                            console.log('Embed sent');
                        } else { return }
                    } else{
                        member.roles.remove(muterole);
                        console.log(`Unmuted ${member.user.tag} because they werent in the database`);
                        embed.setTitle(`${member.user.tag} has been unmuted!`);
                        embed.setDescription(`**By:** <@${client.user.id}>\n**Reason:** User not in database`);
                        logs.send({embeds: [embed]});
                        console.log('Embed sent');
                    }
                } else{ return }
            });
        });
    }
}