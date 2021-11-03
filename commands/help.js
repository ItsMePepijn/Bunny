const Discord = require('discord.js');
const { disconnect } = require('mongoose');
const db = require('quick.db');
const prefix = db.get('prefix');

module.exports = {
	name: 'help',
	description: 'Will bring up the help menu!',
	async execute(message, args) {

        let helpEmbed = new Discord.MessageEmbed()
            .setColor('#ECBCD7')
            .setTimestamp()
            .setTitle('Help centre')
            .addFields(
            { name: '\u200b', value: `These are all the awesome commands you can use right now!\nClick any of the buttons to view more information about that command` },
            { name: '> Help,\n> Membercount,\n> Avatar,\n> Cat,\n> Love,\n> Dog,\n> Mutestatus,\n> Warnings', value: '\u200b', inline: true},
            );

        let membercountEmbed = new Discord.MessageEmbed()
            .setColor('#ECBCD7')
            .setTimestamp()
            .setTitle('membercount')
            .setDescription('Displays the current membercount')
            .addField('Usage:', `\`${prefix}membercount\``);

        let avatarEmbed = new Discord.MessageEmbed()
            .setColor('#ECBCD7')
            .setTimestamp()
            .setTitle('Avatar')
            .setDescription('Displays your or mentioned user\'s avatar')
            .addField('Usage:', `\`${prefix}(av)atar\``);

        let catEmbed = new Discord.MessageEmbed()
            .setColor('#ECBCD7')
            .setTimestamp()
            .setTitle('Cat')
            .setDescription('Gives you a cute cat 🥰')
            .addField('Usage:', `\`${prefix}cat\``);
        let loveEmbed = new Discord.MessageEmbed()
            .setColor('#ECBCD7')
            .setTimestamp()
            .setTitle('Love')
            .setDescription('Sends gifs to someone about the specified topic')
            .addField('Usage:', `\`${prefix}hug, ${prefix}kiss, ${prefix}handshake, ${prefix}punch, ${prefix}shoot and ${prefix}slap\``);

        let dogEmbed = new Discord.MessageEmbed()
            .setColor('#ECBCD7')
            .setTimestamp()
            .setTitle('Dog')
            .setDescription('Gives you a cute doggo 🥰')
            .addField('Usage:', `\`${prefix}dog\``);

        let mutestatusEmbed = new Discord.MessageEmbed()
            .setColor('#ECBCD7')
            .setTimestamp()
            .setTitle('Mutestatus')
            .setDescription('Gives information about a muted member')
            .addField('Usage:', `\`${prefix}mutestatus noobmaster69\``);

        let warningsEmbed = new Discord.MessageEmbed()
            .setColor('#ECBCD7')
            .setTimestamp()
            .setTitle('Warnings')
            .setDescription('Displays the warnings from yourself or from another user')
            .addField('Usage:', `\`${prefix}warnings noobmaster69\``);

        const helpRow1 = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId('membercount')
                .setLabel('Membercount')
                .setStyle('SECONDARY'),
            new Discord.MessageButton()
                .setCustomId('avatar')
                .setLabel('Avatar')
                .setStyle('SECONDARY'),
            new Discord.MessageButton()
                .setCustomId('cat')
                .setLabel('Cat')
                .setStyle('SECONDARY'),
            new Discord.MessageButton()
                .setCustomId('love')
                .setLabel('Love')
                .setStyle('SECONDARY'),
            new Discord.MessageButton()
                .setCustomId('dog')
                .setLabel('Dog')
                .setStyle('SECONDARY')
        );
        const helpRow2 = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId('mutestatus')
                .setLabel('Mutestatus')
                .setStyle('SECONDARY'),
            new Discord.MessageButton()
                .setCustomId('warnings')
                .setLabel('Warnings')
                .setStyle('SECONDARY')
        )

        const backRow = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
                .setCustomId('back')
                .setLabel('Back')
                .setStyle('SECONDARY'),
        )

        const response = await message.reply({embeds: [helpEmbed], components: [helpRow1, helpRow2]});

        const filter = (interaction) => {
            if (interaction.user.id === message.author.id) return true;
            return interaction.deferUpdate();
        }
        const collector = message.channel.createMessageComponentCollector({
            filter,
            time: 600000
        });

        collector.on("collect", (iButton) => {
    
            const id = iButton.customId;

            if(id == 'back'){
                iButton.deferUpdate();
                response.edit({embeds: [helpEmbed], components: [helpRow1, helpRow2]})
            }
            
            if(id == 'membercount'){
                iButton.deferUpdate();
                response.edit({embeds: [membercountEmbed], components: [backRow]})
            }

            if(id == 'avatar'){
                iButton.deferUpdate();
                response.edit({embeds: [avatarEmbed], components: [backRow]})
            }

            if(id == 'cat'){
                iButton.deferUpdate();
                response.edit({embeds: [catEmbed], components: [backRow]})
            }

            if(id == 'love'){
                iButton.deferUpdate();
                response.edit({embeds: [loveEmbed], components: [backRow]})
            }

            if(id == 'dog'){
                iButton.deferUpdate();
                response.edit({embeds: [dogEmbed], components: [backRow]})
            }

            if(id == 'mutestatus'){
                iButton.deferUpdate();
                response.edit({embeds: [mutestatusEmbed], components: [backRow]})
            }

            if(id == 'warnings'){
                iButton.deferUpdate();
                response.edit({embeds: [warningsEmbed], components: [backRow]})
            }

        });

        collector.on('end', () => {
            const embed = response.embeds[0]
            const oldTitle = embed.title
            embed.setTitle(`${oldTitle} (Closed)`)

            response.edit({embeds: [embed], components: []})
        })

    }
};
