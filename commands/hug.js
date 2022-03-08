const { default: axios } = require("axios");
const Discord = require('discord.js');
const db = require('quick.db')

module.exports = {
	name: 'hug',
	description: 'Send a random hug',
	execute(message) {
        const embed = new Discord.MessageEmbed()
        embed.setColor(db.get('embedColor'))
        embed.setTimestamp()
        const {tenorkey} = require('../config.json')
		axios
		.get(`https://g.tenor.com/v1/random?key=${tenorkey}&q=anime%20hug&locale=en_US&contentfilter=medium&media_filter=minimal&ar_range=wide&limit=1`)
		.then((res) => {
            if(!message.mentions.users.first()){
                embed.setTitle("You hugged yourself");
            }else{
                embed.setTitle(`You hugged ${message.mentions.users.first().tag}`)
            }
			embed.setImage(res.data.results[0].media[0].gif.url)
			message.channel.send({embeds: [embed] });
			console.log('Embed sent')
		})
		.catch((err) => {
			console.log('ERR:', err);
            embed.setTitle('Error')
            embed.setDescription('Something went wrong!')
            message.channel.send({embeds: [embed] });
            console.log('Embed sent');
		})
	},
};