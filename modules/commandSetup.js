const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk')
const {client} = require('../modules/client')

client.commands = new Discord.Collection();


function setCommands(){
    const commandFiles = fs.readdirSync('./commands')
    for (const item of commandFiles) {
        if(fs.statSync(`./commands/${item}`).isDirectory()){
            const folderFiles = fs.readdirSync(`./commands/${item}`).filter(file => file.endsWith('.js'));
            
            for (const file of folderFiles) {
                const command = require(`../commands/${item}/${file}`);
                if(command.isDisabled) console.log(chalk.redBright('[COMMAND HANDLER]') + ` - ${file} has been loaded but its disabled!`);
                else console.log(chalk.green('[COMMAND HANDLER]') + ` - ${file} has been loaded`);
                client.commands.set(command.name, command);
            }
        }
        else if(item.endsWith('.js')){
            const command = require(`../commands/${item}`);
            if(command.isDisabled) console.log(chalk.redBright('[COMMAND HANDLER]') + ` - ${item} has been loaded but its disabled!`);
            else console.log(chalk.green('[COMMAND HANDLER]') + ` - ${item} has been loaded`);
            client.commands.set(command.name, command);
        }
        else return
    }
}

module.exports = {
    setCommands
}