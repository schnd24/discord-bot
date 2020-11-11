
const Discord = require("discord.js");


module.exports.run = async (bot,Message, args) => {
    const embed = new Discord.MessageEmbed();
    setTitle("this is a test Embed")
    .setUrl('')

    Message.channel.send(embed)
}

module.export.config = {
    name: "embed",
    description: "Example of an embed",
    usage: "?embed",
    accessableby: "Members",
    aliases: ['h']
}