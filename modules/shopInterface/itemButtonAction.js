const Shop = require('./shopInterface')
const db = require('quick.db')
var economy = new db.table('economy')

function itemButtonAction(message, response, iButton, roleId, name, longName, price){
    const id = iButton.customId
    if(id == name){
        response.edit({embeds: [Shop.itemEmbed(longName, price, message.member.id)], components: [Shop.transRow(name), Shop.backRow()]})
        iButton.deferUpdate()
    }
    if(id == `buy ${name}`){
        response.edit({embeds: [Shop.confirmBuyEmbed()], components: [Shop.confirmRow(name, 'Buy')]})
        iButton.deferUpdate()
    }
    if(id == `cancelBuy ${name}`){
        response.edit({embeds: [Shop.itemEmbed(longName, price, message.member.id)], components: [Shop.transRow(name), Shop.backRow()]})
        iButton.deferUpdate()
    }
    if(id == `confirmBuy ${name}`){
        response.edit({embeds: [Shop.confirmedBuyEmbed(longName)], components: []})
        iButton.deferUpdate()
        economy.subtract(`user_${message.member.id}.balance`, price)
        message.member.roles.add(message.guild.roles.cache.get(roleId))
        setTimeout(() => {
            response.edit({embeds: [Shop.itemEmbed(longName, price, message.member.id)], components: [Shop.transRow(name), Shop.backRow()]})
        }, 2000);
    }

    if(id == `sell ${name}`){
        response.edit({embeds: [Shop.confirmSellEmbed()], components: [Shop.confirmRow(name, 'Sell')]})
        iButton.deferUpdate()
    }
    if(id == `cancelSell ${name}`){
        response.edit({embeds: [Shop.itemEmbed(longName, price, message.member.id)], components: [Shop.transRow(name), Shop.backRow()]})
        iButton.deferUpdate()
    }
    if(id == `confirmSell ${name}`){
        response.edit({embeds: [Shop.confirmedSellEmbed(longName)], components: []})
        iButton.deferUpdate()
        economy.add(`user_${message.member.id}.balance`, price)
        message.member.roles.remove(message.guild.roles.cache.get(roleId))
        setTimeout(() => {
            response.edit({embeds: [Shop.itemEmbed(longName, price, message.member.id)], components: [Shop.transRow(name), Shop.backRow()]})
        }, 2000);
    }
}

module.exports = {
    itemButtonAction
}