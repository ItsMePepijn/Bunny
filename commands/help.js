const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'help',
	description: 'Will bring up the help menu!',
	execute(message, args) {
        const prefix = db.get('prefix');
        let embed = new Discord.MessageEmbed()
        embed.setColor('#ECBCD7');
        embed.setTimestamp();
        if (!args.length) {
            embed.setTitle('Help centre');
            embed.addFields(
              { name: '\u200b', value: `These are all the awesome commands you can use right now!` },
              { name: 'Help', value: 'The menu you are in right now!', },
              { name: 'Membercount', value: `Use \`${prefix}help membercount\` for more info`, inline: true },
              { name: 'Avatar', value: `Use \`${prefix}help (av)atar\` for more info`, inline: true },
              { name: 'Cat', value: `Use \`${prefix}help cat\` for more info`, inline: true },
              { name: 'Love', value: `I have a lot of love commands! like \`${prefix}hug\` and \`${prefix}kiss\`. Use \`${prefix}help love\` for more info`, inline: true},
              { name: 'Dog', value: `Use \`${prefix}help dog\` for more info`, inline: true },
              { name: 'Mutestatus', value: `Use \`${prefix}help mutestatus\` for more info`, inline: true},
              { name: 'Warnings', value: `Use \`${prefix}help warnings\` for more info`, inline: true}
            )
            console.log('Embed sent')
            return message.channel.send({embeds: [embed]});
        } 
        else if(args[0] == 'membercount'){
          embed.setTitle('membercount');
          embed.setDescription('Displays the current membercount');
          embed.addField('Usage:', `\`${prefix}membercount\``);
          message.channel.send({embeds: [embed]});
          console.log('Embed sent')
        }
        else if(args[0] == 'avatar'){
          embed.setTitle('Avatar');
          embed.setDescription('Displays your or mentioned user\'s avatar');
          embed.addField('Usage:', `\`${prefix}(av)atar\``);
          message.channel.send({embeds: [embed]});
          console.log('Embed sent')
        }
        else if(args[0] == 'cat'){
          embed.setTitle('Cat');
          embed.setDescription('Gives you a cute cat 🥰');
          embed.addField('Usage:', `\`${prefix}cat\``);
          message.channel.send({embeds: [embed]});
          console.log('Embed sent')
        }
        else if(args[0] == 'dog'){
          embed.setTitle('Dog');
          embed.setDescription('Gives you a cute doggo 🥰');
          embed.addField('Usage:', `\`${prefix}dog\``);
          message.channel.send({embeds: [embed]});
          console.log('Embed sent')
        }
        else if(args[0] == 'love'){
          embed.setTitle('Love');
          embed.setDescription('Sends gifs to someone about the specified topic');
          embed.addField('Usage:', `\`${prefix}hug, ${prefix}kiss, ${prefix}handshake, ${prefix}punch, ${prefix}shoot and ${prefix}slap\``);
          message.channel.send({embeds: [embed]});
          console.log('Embed sent')
        }
        else if(args[0] == 'warnings'){
          embed.setTitle('Warnings');
          embed.setDescription('Displays the warnings from yourself or from another user');
          embed.addField('Usage:', `\`${prefix}warnings noobmaster69\``);
          message.channel.send({embeds: [embed]});
          console.log('Embed sent')
        }
        else if(args[0] == 'mutestatus'){
          embed.setTitle('Mutestatus');
          embed.setDescription('Gives information about a muted member');
          embed.addField('Usage:', `\`${prefix}mutestatus noobmaster69\``);
          message.channel.send({embeds: [embed]});
          console.log('Embed sent')
        }
    }
};
