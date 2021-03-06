const { default: axios } = require("axios");
const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
	name: 'dog',
	description: 'Sends a random dog',
	execute(message) {
        const embed = new Discord.MessageEmbed()
		axios
		.get('https://api.thedogapi.com/v1/images/search')
		.then((res) => {
            embed.setTitle("Your random dog:")
			embed.setColor(db.get('embedColor'))
            embed.setTimestamp()
			embed.setImage(res.data[0].url)
			message.channel.send({embeds: [embed] });
			console.log('Embed sent')
		})
		.catch((err) => {
			console.log('ERR:', err)
		})
	},
};