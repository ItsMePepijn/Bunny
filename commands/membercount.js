const Discord = require('discord.js');

module.exports = {
	name: 'membercount',
	description: 'Will show the current guild membercount',
	execute(message) {
        let Embed = new Discord.MessageEmbed()
        .setColor('#ECBCD7')
        .addField('Members', message.guild.memberCount)
        .setTimestamp()
          message.channel.send(Embed);
        console.log('Embed sent')
	},
};