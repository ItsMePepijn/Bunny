const Discord = require('discord.js');
const db = require('quick.db');
const prefix = db.get('prefix');
const Help = require('../modules/helpInterface/helpInterface')
const {itemButtonAction} = require('../modules/helpInterface/itemButtonAction')


module.exports = {
	name: 'help',
	description: 'Will bring up the help menu!',
	async execute(message) {

        var components = [
            Help.itemRow(['Membercount', 'Avatar', 'Cat', 'Dog', 'Love']),
            Help.itemRow(['Warnings'])
        ]

        const response = await message.reply({embeds: [Help.mainEmbed()], components: components});

        const filter = (interaction) => {
            if (interaction.user.id === message.author.id) return true;
            return interaction.deferUpdate();
        }
        const collector = response.createMessageComponentCollector({
            filter,
            time: 600000
        });

        collector.on("collect", (iButton) => {
    
            const id = iButton.customId;

            if(id == 'back'){
                iButton.deferUpdate();
                response.edit({embeds: [Help.mainEmbed()], components: components})
            }
            
            itemButtonAction(iButton, response, 'Membercount', 'Displays the current membercount', `\`${prefix}membercount\``)
            itemButtonAction(iButton, response, 'Avatar', 'Displays your or mentioned user\'s avatar', `\`${prefix}(av)atar\``)
            itemButtonAction(iButton, response, 'Cat', 'Gives you a cute cat 🥰', `\`${prefix}cat\``)
            itemButtonAction(iButton, response, 'Dog', 'Gives you a cute doggo 🥰', `\`${prefix}dog\``)
            itemButtonAction(iButton, response, 'Love', 'Sends gifs to someone about the specified topic', `\`${prefix}hug, ${prefix}kiss, ${prefix}handshake, ${prefix}punch, ${prefix}shoot and ${prefix}slap\``)
            itemButtonAction(iButton, response, 'Warnings', 'Displays the warnings from yourself or from another user', `\`${prefix}warnings noobmaster69\``)

        });

        collector.on('end', () => {
            const embed = response.embeds[0]
            const oldTitle = embed.title
            embed.setTitle(`${oldTitle} (Closed)`)

            response.edit({embeds: [embed], components: []})
        })

    }
};
