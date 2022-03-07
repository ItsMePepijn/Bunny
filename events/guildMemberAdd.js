module.exports = {
    name: 'guildMemberAdd',
    execute(member){
        console.log(`${member.displayName} joined the server!`)
    
        if(!member.user.bot){
            const welcomechannel = member.guild.channels.cache.get(db.get('channels.welcome'));
            welcomechannel.send('<a:letterw:898615332418256947><a:lettere:898615332929929246><a:letterl:898615333038985226><a:letterc:898615332774744095><a:lettero:898615332950908928><a:letterm:898615332825104405><a:lettere:898615332929929246><a:exclamationmark:898615332724432957>')
            welcomechannel.send(`<a:letterh:898615637176356895><a:letteri:898615637423841290> ・ Nice to meet you ${member}!\n> ୨・Please first read the rules in <#863742019372711996>\n> ୨・Get your roles in <#863750202383794186>\n> ୨・Please verify in <#898537277599404034>!\n◇─◇──◇──────◇──◇─◇`)
    
        }
    }
}