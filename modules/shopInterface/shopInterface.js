const Discord = require('discord.js');
const db = require('quick.db');
const pfx = db.get('prefix');
var economy = new db.table('economy')
const numeral = require('numeral');


function mainEmbed(message){
    const mainEmbed = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(db.get('embedColor'))
        .setTitle(`Shop ${message.member.nickname}`)
        .addField(`These are all the items you can buy with bubbies! To see how many bubbies you own, use ${pfx}wallet`, 'To view more information about an item or to buy it, click the buttom with the item name.')
        .addFields(
            { name: 'Milestone role rank 1', value: '10,000', inline: true },
            { name: 'Milestone role rank 2', value: '20,000', inline: true },
            { name: 'Milestone role rank 3', value: '50,000', inline: true },
            { name: 'Milestone role rank 4', value: '100,000', inline: true },
            { name: 'Milestone role rank 5', value: '200,000', inline: true },
            { name: 'Milestone role rank 6', value: '500,000', inline: true }
        )
    return mainEmbed
}

function itemEmbed(itemName, itemCost, userId){
    if(Number.isInteger(economy.get(`user_${userId}.balance`))) var balance = numeral(economy.get(`user_${userId}.balance`)).format('0,0')
    else var balance = numeral(economy.get(`user_${userId}.balance`)).format('0,0.00')

    if(Number.isInteger(itemCost)) var price = numeral(itemCost).format('0,0')
    else var price = numeral(itemCost).format('0,0.00')

    const itemEmbed = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(db.get('embedColor'))
        .setTitle(itemName)
        .setDescription(`To buy or sell this item, press the button!\n**Cost:** ${price}\n**Your balance:** ${balance}`)
    return itemEmbed
}

function confirmBuyEmbed(){
    const confirmEmbed = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(db.get('embedColor'))
        .setTitle('Please confirm')
        .setDescription(`Are you sure you wanna buy this?`)
    return confirmEmbed
}

function confirmedBuyEmbed(item){
    const confirmedEmbed = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(db.get('embedColor'))
        .setTitle('Done!')
        .setDescription(`You have bought ${item}!`)
    return confirmedEmbed
}

function confirmSellEmbed(){
    const confirmEmbed = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(db.get('embedColor'))
        .setTitle('Please confirm')
        .setDescription(`Are you sure you wanna sell this?`)
    return confirmEmbed
}

function confirmedSellEmbed(item){
    const confirmedEmbed = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(db.get('embedColor'))
        .setTitle('Done!')
        .setDescription(`You sold ${item}!`)
    return confirmedEmbed
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

function backRow(){
    const backRow = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
            .setCustomId('back')
            .setLabel('Back')
            .setStyle('SECONDARY'),
    )
    return backRow
}

function transRow(item){
    const transRow = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
            .setCustomId(`sell ${item}`)
            .setLabel('Sell')
            .setStyle('DANGER'),
        new Discord.MessageButton()
            .setCustomId(`buy ${item}`)
            .setLabel('Buy')
            .setStyle('SUCCESS'),
    )
    return transRow
}

function confirmRow(item, method){
    const confirmRow = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
            .setCustomId(`cancel${method} ${item}`)
            .setLabel('Cancel')
            .setStyle('DANGER'),
        new Discord.MessageButton()
            .setCustomId(`confirm${method} ${item}`)
            .setLabel('Confirm')
            .setStyle('SUCCESS'),
    )
    return confirmRow
}

module.exports = {
    mainEmbed,
    itemEmbed,
    confirmBuyEmbed,
    confirmedBuyEmbed,
    confirmSellEmbed,
    confirmedSellEmbed,

    backRow,
    transRow,
    confirmRow,
    itemRow
}