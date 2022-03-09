const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
        name: 'membercount',
	description: 'Will show the current guild membercount',
	execute(message) {
                const embed = new Discord.MessageEmbed()
                embed.setColor(db.get('embedColor'))
                embed.addField('Members', message.guild.memberCount.toString())
                embed.setTimestamp()
                message.channel.send({embeds: [embed] });
                console.log('Embed sent')
	},
};