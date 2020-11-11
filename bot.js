const token = '';
const {welcome, purge, kick, ban, status, say, mute} = require("discord-bot-maker");
const Discord = require("discord.js");
const bot = new Discord.Client();
welcome(bot, {
  privatemsg : "Private Message",
  publicmsg : "Public Message", //@GUILDNAME @MEMBER
  publicchannelid : "773541721875021865" //CHANNEL ID
});
purge(bot, {
  prefix:"!",
  purgecommand: "purge",
  errormsg: "asd",
  nopermmsg: "asd",
});
kick(bot, {
  prefix:"!",
  kickcommand: "kick",
  nopermmsg: "No Perm Error",
  mentionerrormsg: "Mention Error",
  higherroleerrormsg: "Higher Role Error",
  defaultreason: "Default Reason",
  kickmsg: "@KICKAUTHOR @KICKEDUSER @REASON" //@KICKAUTHOR @KICKEDUSER @REASON
});
ban(bot, {
  prefix:"!",
  bancommand: "ban",
  nopermmsg: "No Perm Error",
  mentionerrormsg: "Mention Error",
  higherroleerrormsg: "Higher Role Error",
  defaultreason: "Default Reason",
  banmsg: "Ban Message" //@BANAUTHOR @BANNEDUSER @REASON
});
status(bot, {
  type: "PLAYING", //PLAYING, WATCHING, STREAMING
  title: "discord international"
});
say(bot, {
  prefix:"!",
  nopermmsg: "No Perm Error"
});
mute(bot, {
  prefix:"!",
  nopermmsg: "No Perm Error",
  mentionerrormsg: "Mention Error",
  alreadyhasrole: "Already Has Role Error",
  roleid: "773542231038492683", //SECONDARY ROLE ID*
  defaultreason: "Default Reason",
  mutemsg: "Mute Message" //@MUTEDUSER, @MUTEAUTHOR, @REASON
});
bot.login(token)