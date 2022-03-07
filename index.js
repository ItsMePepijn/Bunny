const db = require('quick.db');
const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');

const pfx = db.get('prefix');

const DIF = Discord.Intents.FLAGS
const client = new Discord.Client({ intents: [
    DIF.GUILDS, 
    DIF.GUILD_MESSAGES, 
    DIF.GUILD_BANS,
    DIF.GUILD_MEMBERS,
    DIF.DIRECT_MESSAGES,
    DIF.GUILD_INTEGRATIONS
], 
partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Discord.Collection();
const embed = new Discord.MessageEmbed()

//Commands setup
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
	if(command.isDisabled) console.log(chalk.redBright('[COMMAND HANDLER]') + ` - ${file} has been loaded but its disabled!`);
	else console.log(chalk.green('[COMMAND HANDLER]') + ` - ${file} has been loaded`);
    client.commands.set(command.name, command);
}

console.log(' ')

const muteloop = client.commands.get('muteloop');
function muteloopstart(){
    muteloop.execute(client)
}

//On ready
client.on('ready', () => {
    console.log(chalk.greenBright(client.user.tag + ' Has logged in!'));
    readymessage();

});

//Sends message in logs when bot starts
function readymessage(){
    const logs = client.channels.cache.find(channel => channel.id === '899644501071659008');
    embed.setTitle('Bot started!')
    embed.setColor('#ECBCD7')
    embed.setTimestamp()
    logs.send({embeds: [embed] })
}

//Config setup
const {token} = require(__dirname + '/config.json');

//Command handler
client.on('messageCreate', message => {
    const args = message.content.slice(pfx.length).trim().split(' ');
    if(message.channel.id == '899636638681006080'){
        if(message.member.permissions.has('ADMINISTRATOR')) return
        if(args[0] != 'suggest') return message.delete();
    }
    if (!message.content.startsWith(pfx) || message.author.bot || !message.guild) return;
    const command = args.shift().toLowerCase();
    if(command === 'muteloop') return;

    const file = client.commands.get(command);
    if(file) file.execute(message, args, client);
});

//deleted message logger
client.on('messageDelete', message => {
    if(!message.partial){
        if(message.content === `${pfx}verify`) return
        if(message.author.bot) return
        if(message.channel.id == '899636638681006080') return
        if(message.channel.id == '898537277599404034') return
        const logs = client.channels.cache.find(channel => channel.id === '899603341812842527');
        embed.setTitle('Deleted message:')
        embed.setDescription(`**Messsage:** ${message.content}\n**Sent by:** ${message.author}\n**In:** <#${message.channel.id}>`)
        embed.setColor('#ECBCD7')
        embed.setTimestamp()
        logs.send({embeds: [embed] })
    }
});

client.on('guildMemberAdd', member => {
    if(db.has(`member_${member.user.id}.mutedtime`)){
        var time = db.get(`member_${member.user.id}.mutedtime`);
        var check = time - Date.now()
        const muterole = member.guild.roles.cache.get('897820144833798224');
        const logs = member.guild.channels.cache.get('864535338977591326');
        if(check <= 0){
            db.delete(`member_${member.user.id}.mutedtime`);
            db.delete(`member_${member.user.id}.mutedreason`);
            console.log(`Unmuted ${member.user.tag}`);
            embed.setTitle(`${member.user.tag} has been unmuted!`);
            embed.setDescription(`**By:** <@${client.user.id}>\n**Reason:** Time expired`);
            logs.send({embeds: [embed]});
            console.log('Embed sent');
        } else { 
            member.roles.add(muterole);
            console.log(`${member.user.tag} has joined the server and has been given the mute role!`);
        }
    }

    if(!member.user.bot){
        const welcomechannel = member.guild.channels.cache.get('864217864889958400');
        welcomechannel.send('<a:letterw:898615332418256947><a:lettere:898615332929929246><a:letterl:898615333038985226><a:letterc:898615332774744095><a:lettero:898615332950908928><a:letterm:898615332825104405><a:lettere:898615332929929246><a:exclamationmark:898615332724432957>')
        welcomechannel.send(`<a:letterh:898615637176356895><a:letteri:898615637423841290> ・ Nice to meet you ${member}!\n> ୨・Please first read the rules in <#863742019372711996>\n> ୨・Get your roles in <#863750202383794186>\n> ୨・Please verify in <#898537277599404034>!\n◇─◇──◇──────◇──◇─◇`)

    }
});

client.on('interactionCreate', interaction => {
    if(interaction.isButton){
        if(interaction.customId == 'verify'){
            const memberole = interaction.guild.roles.cache.get('898536580468334602');
            const verifylogs = interaction.guild.channels.cache.get('898538121908613121');
            const chat = interaction.guild.channels.cache.get('864532474398507048');
            const embed = new Discord.MessageEmbed();
            const embed2 = new Discord.MessageEmbed();
            if(!interaction.member.roles.cache.has('898536580468334602')){
                interaction.deferUpdate();
                interaction.member.roles.add(memberole);
                embed.setTitle(`${interaction.user.tag} has veen verified!`);
                embed.setDescription(`${interaction.member}\n<t:${Math.round(Date.now() / 1000)}:R>`);
                embed.setFooter(`${interaction.member.id}`, `${interaction.member.displayAvatarURL({format: 'png', dynamic: true })}`);
                embed.setColor("#ECBCD7");
                embed.setTimestamp();

                embed2.setTitle('A new member appeared!');
                embed2.setDescription(`Give ${interaction.member} a warm welcome!`);
                embed2.setFooter(`${interaction.member.id}`, `${interaction.member.displayAvatarURL({format: 'png', dynamic: true})}`);
                embed2.setColor("#ECBCD7");
                embed2.setTimestamp();

                verifylogs.send({embeds: [embed] });
                chat.send({embeds: [embed2] });
                console.log('Embed sent');
                console.log(`${interaction.user.tag} has veen verified!`)
            }else{
                interaction.deferUpdate()
            }
        }
    }
});

client.login(token);