const Discord = require("discord.js");

module.export.run = async (bot, message, args) =>
let helpArray = message.content.split("");
let helpArgs = helpArray.slice(1);

if(helpArgs[0]=== 'gaming') {
    return message.reply("this is an information Command.")
}

if(helpArgs[0]) {
    var embed = new Discord.MessageEmbed()
    .setAuthor('here is the command to use !')
    .setDescription (````| hello | mute | unmute | addrole | removerole | embed | Kick | ban |````)
    .addField({name: 'prefix', value:`````!```, inline: true})
    .setColor('#00fff3')

    Message.channel.send(embed);
}

if(helpArgs[0]) {
    let command = helpArgs[0];

    if(bot.command.has(command)){
    var embed = new Discord.MessageEmbed()
    .setAuthor(`${command.config.name} Command`)
    .setThumbnail(bot.user.displayAvatarURL)
    .setDescription(`
    -**Command's Description**__$(command.config.description|| "there is no description for this command  Command`)
    -commands usage:__$(command.config.usage||'No usage')
    -commands Permissions:__$(command.config.accessbleby||"?members")
    `)

    }
}