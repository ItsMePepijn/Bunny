const Discord = require('discord.js');

function mainEmbed(){
    const mainEmbed = new Discord.MessageEmbed()
        .setColor('#ECBCD7')
        .setTimestamp()
        .setTitle('Help centre')
        .setDescription('These are all the awesome commands you can use right now!\nClick any of the buttons to view more information about that command')
        .addField('> Help,\n> Membercount,\n> Avatar,\n> Cat,\n> Love,\n> Dog,\n> Mutestatus,\n> Warnings', '\u200b');
    return mainEmbed
}

function item(name, description, usage){
    const item = new Discord.MessageEmbed()
        .setColor('#ECBCD7')
        .setTimestamp()
        .setTitle(name)
        .setDescription(description)
        .addField('Usage: ', usage);
    return item
}

function backRow(){
    const backRow = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
            .setCustomId('back')
            .setLabel('Back')
            .setStyle('SECONDARY'),
    )
    return backRow
}

function itemRow(buttons){
    const itemRow = new Discord.MessageActionRow()
        buttons.forEach(buttonName => {
            itemRow.addComponents(
                new Discord.MessageButton()
                .setCustomId(buttonName)
                .setLabel(buttonName)
                .setStyle('SECONDARY')
            )
        }) 
    return itemRow
}


module.exports = {
    mainEmbed,
    item,

    backRow,
    itemRow
}