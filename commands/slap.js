const { default: axios } = require("axios");
const Discord = require('discord.js');

module.exports = {
	name: 'slap',
	description: 'Send a random slap',
	execute(message) {
        const embed = new Discord.MessageEmbed()
        const {tenorkey} = require('../config.json')
		axios
		.get(`https://g.tenor.com/v1/random?key=${tenorkey}&q=anime%20slap&locale=en_US&contentfilter=medium&media_filter=minimal&ar_range=wide&limit=1`)
		.then((res) => {
            if(!message.mentions.users.first()){
                embed.setTitle("You slapped yourself");
            }else{
                embed.setTitle(`You slapped ${message.mentions.users.first().tag}`)
            }
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
			embed.setImage(res.data.results[0].media[0].gif.url)
			message.channel.send({embeds: [embed] });
			console.log('Embed sent')
		})
		.catch((err) => {
			console.log('ERR:', err);
            embed.setTitle('Error')
            embed.setDescription('Something went wrong!')
            embed.setColor("#ECBCD7")
            embed.setTimestamp()
            message.channel.send({embeds: [embed] });
            console.log('Embed sent');
		})
	},
};