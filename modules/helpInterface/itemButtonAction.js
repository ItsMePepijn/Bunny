const Help = require('./helpInterface')

function itemButtonAction(iButton, response, command, description, usage){
    const id = iButton.customId
    if(id == command){
        response.edit({embeds: [Help.item(command, description, usage)], components: [Help.backRow()]})
        iButton.deferUpdate()
    }
}

module.exports = {
    itemButtonAction
}