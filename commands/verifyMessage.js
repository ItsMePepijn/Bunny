const Discord = require('discord.js');
 
module.exports = {
    name: 'verifymessage',
    description: 'sends the verify message',
    execute(message){
        if(message.member.permissions.has('ADMINISTRATOR')){
            const row = new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton()
                    .setCustomId('verify')
                    .setEmoji('<:remsip:898599034313388072>')
                    .setStyle('SECONDARY')
            );
            console.log(`Verify message created by ${message.member.user.username}`)
            message.channel.send({content: 'https://cdn.discordapp.com/attachments/864534586402013254/907320419164487750/verify.png'})
            message.channel.send({content: '** **\n**Please verify!**\n\n◇─◇──◇──────◇──◇─◇\n\n> To get access to the server please click the button below!\n> Make sure to read the rules in <#863742019372711996>\n> Get your roles in <#863750202383794186>\n> Have a wonderful time in Sleepy club!\n\n◇─◇──◇──────◇──◇─◇\n** **', components: [row]})
        }else{return}
    }
}