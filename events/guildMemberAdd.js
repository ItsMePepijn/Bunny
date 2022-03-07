module.exports = {
    name: 'guildMemberAdd',
    execute(member){
        console.log(`${member.displayName} joined the server!`)
        
        if(db.has(`member_${member.user.id}.mutedtime`)){
            var time = db.get(`member_${member.user.id}.mutedtime`);
            var check = time - Date.now()
            const muterole = member.guild.roles.cache.get('897820144833798224');
            const logs = member.guild.channels.cache.get('864535338977591326');
            if(check <= 0){
                db.delete(`member_${member.user.id}.mutedtime`);
                db.delete(`member_${member.user.id}.mutedreason`);
                console.log(`Unmuted ${member.user.tag}`);
                embed.setTitle(`${member.user.tag} has been unmuted!`);
                embed.setDescription(`**By:** <@${client.user.id}>\n**Reason:** Time expired`);
                logs.send({embeds: [embed]});
                console.log('Embed sent');
            } else { 
                member.roles.add(muterole);
                console.log(`${member.user.tag} has joined the server and has been given the mute role!`);
            }
        }
    
        if(!member.user.bot){
            const welcomechannel = member.guild.channels.cache.get('864217864889958400');
            welcomechannel.send('<a:letterw:898615332418256947><a:lettere:898615332929929246><a:letterl:898615333038985226><a:letterc:898615332774744095><a:lettero:898615332950908928><a:letterm:898615332825104405><a:lettere:898615332929929246><a:exclamationmark:898615332724432957>')
            welcomechannel.send(`<a:letterh:898615637176356895><a:letteri:898615637423841290> ・ Nice to meet you ${member}!\n> ୨・Please first read the rules in <#863742019372711996>\n> ୨・Get your roles in <#863750202383794186>\n> ୨・Please verify in <#898537277599404034>!\n◇─◇──◇──────◇──◇─◇`)
    
        }
    }
}