const { default: axios } = require("axios");
const Discord = require('discord.js');

module.exports = {
	name: 'cat',
	description: 'Sends a random cat',
	execute(message) {
        const embed = new Discord.MessageEmbed()
		axios
		.get('https://api.thecatapi.com/v1/images/search')
		.then((res) => {
            embed.setTitle("Your random cat:")
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
			embed.setImage(res.data[0].url)
			message.channel.send(embed);
			console.log('Embed sent')
		})
		.catch((err) => {
			console.log('ERR:', err)
		})
	},
};