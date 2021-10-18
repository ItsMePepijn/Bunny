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
], 
partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.commands = new Discord.Collection();
const embed = new Discord.MessageEmbed()

//Commands setup
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(chalk.greenBright('[COMMAND HANDLER]') + ' - ' + chalk.blueBright(`${file} has been loaded`));
    client.commands.set(command.name, command);
}

const muteloop = client.commands.get('muteloop');
function muteloopstart(){
    muteloop.execute(client)
}

//On ready
client.on('ready', () => {
    console.log(chalk.greenBright(client.user.tag + ' Has logged in!'));
    client.user.setActivity('my master', { type: 'LISTENING' });
    setInterval(muteloopstart, 10000);
    setInterval(MemberCount, 60000)
    readymessage()
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
const {token} = require('./config.json');

//Command handler
client.on('messageCreate', message => {
    const args = message.content.slice(pfx.length).trim().split(' ');
    if(message.channel.id == '899636638681006080'){
        if(message.author.id == '872841043354198047') return
        if(args[0] != 'suggest') return message.delete();
    }
    if(message.channel.id == '898537277599404034'){
        if(message.author.id == '872841043354198047') return
        if(message.content != `${pfx}verify`){
            return message.delete();
        }
    }
    if (!message.content.startsWith(pfx) || message.author.bot || !message.guild) return;
    const command = args.shift().toLowerCase();
    if(command === 'muteloop') return;

    const file = client.commands.get(command);
    if(file) file.execute(message, args, client);
});

//membercount channel
function MemberCount(){
    const channel = client.channels.cache.find(channel => channel.id === '863825218349694996');
    const guild = client.guilds.cache.find(guild => guild.id === "863732935035060264");
    if (!channel) return;
    channel.setName(`୨・${guild.memberCount}`);
}


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

client.login(token);