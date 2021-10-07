const Discord = require('discord.js');

module.exports = {
	name: 'membercount',
	description: 'Will show the current guild membercount',
	execute(message) {
        const embed = new Discord.MessageEmbed()
        embed.setColor('#ECBCD7')
        embed.addField('Members', message.guild.memberCount.toString())
        embed.setTimestamp()
        message.channel.send({embeds: [embed] });
        console.log('Embed sent')
	},
};