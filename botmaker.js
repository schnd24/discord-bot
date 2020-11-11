module.exports.welcome = function(bot, options) {
  
  bot.on('guildMemberAdd', member => {    

    privatemsg = (options && options.privatemsg) || (options[member.guild.id] && options[member.guild.id].privatemsg) || null;
    publicmsg = (options && options.publicmsg) || (options[member.guild.id] && options[member.guild.id].publicmsg) || null;
    publicchannelid = (options && options.publicchannelid) || (options[member.guild.id] && options[member.guild.id].publicchannelid) || null;

    if (publicmsg && publicchannelid) {  
      let channel = member.guild.channels.cache.find(val => val.name === publicchannelid) || member.guild.channels.cache.get(publicchannelid);
      if (!channel) {
        console.log(`Channel "${publicchannelid}" not found`);
      }
      else
      {    
        if (channel.permissionsFor(bot.user).has('SEND_MESSAGES')) {

          if (typeof publicmsg === "object") {

            embed = publicmsg ;
            channel.send({ embed });
          }
          else {
            msg = publicmsg.replace(`@MEMBER`, `${member.user}`);
            msg = msg.replace(`@GUILDNAME`, `${member.guild.name}`);
            channel.send(msg);
          }
        }      
        else
        {
          console.log(`Error: NOPERM here: "${publicchannelid}"`)
        }
      }
    }
    
    if (privatemsg) {
      msg = publicmsg.replace(`@MEMBER`, `${member.user}`);
      msg = msg.replace(`@GUILDNAME`, `${member.guild.name}`);
      member.send(privatemsg)  
    }
  }); 
}

module.exports.purge = function(bot, options) {

  const prefix = (options && options.prefix);

  bot.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    purgecommand = (options && options.purgecommand);
      if(command === purgecommand) {
        errormsg = (options && options.errormsg);
        nopermmsg = (options && options.nopermmsg);
          if (!message.member.hasPermission("ADMINISTRATOR"))
              return message.channel.send(nopermmsg);

          const deleteCount = parseInt(args[0], 10);
          
          if(!deleteCount || deleteCount < 1 || deleteCount > 100)
            return message.channel.send(errormsg);
          
          const fetched = await message.channel.messages.fetch({limit: deleteCount});
          message.channel.bulkDelete(fetched)
            .catch(error => console.log(`Couldn't delete messages because of: ${error}`));
    }
})
}

module.exports.kick = function(bot, options) {

  const prefix = (options && options.prefix);

  bot.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    kickcommand = (options && options.kickcommand);
    if(command === kickcommand) {
      nopermmsg = (options && options.nopermmsg);
      mentionerrormsg = (options && options.mentionerrormsg);
      higherroleerrormsg = (options && options.higherroleerrormsg);
      defaultreason = (options && options.defaultreason);
      kickmsg = (options && options.kickmsg);

      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(nopermmsg);

      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.channel.send(mentionerrormsg);
      if(!member.kickable) 
        return message.channel.send(higherroleerrormsg);

      let reason = args.slice(1).join(' ');
      if(!reason) reason = defaultreason;
      
      await member.kick(reason)
        .catch(error => console.log(`Sorry ${message.author} I couldn't kick because of : ${error}`));
          kickmsg = kickmsg.replace(`@KICKEDUSER`, `${member.user.tag}`);
          kickmsg = kickmsg.replace(`@KICKAUTHOR`, `${message.author.tag}`);
          kickmsg = kickmsg.replace(`@REASON`, `${reason}`);  
        message.channel.send(kickmsg);
        
    }
})
}

module.exports.ban = function(bot, options) {

  const prefix = (options && options.prefix);

  bot.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    bancommand = (options && options.bancommand);
    if(command === bancommand) {
      
      nopermmsg = (options && options.nopermmsg);
      mentionerrormsg = (options && options.mentionerrormsg);
      higherroleerrormsg = (options && options.higherroleerrormsg);
      defaultreason = (options && options.defaultreason);
      banmsg = (options && options.banmsg);

      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(nopermmsg);

      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.channel.send(mentionerrormsg);
      if(!member.bannable) 
        return message.channel.send(higherroleerrormsg);

      let reason = args.slice(1).join(' ');
      if(!reason) reason = defaultreason;
      
      await member.ban(reason)
        .catch(error => console.log(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        banmsg = banmsg.replace(`@BANNEDUSER`, `${member.user.tag}`);
        banmsg = banmsg.replace(`@BANAUTHOR`, `${message.author.tag}`);
        banmsg = banmsg.replace(`@REASON`, `${reason}`);  
        message.channel.send(banmsg);
        
    }
})
}

module.exports.status = function(bot, options) {
bot.on('ready', () => {
  type = (options && options.type);
  title = (options && options.title);
  bot.user.setStatus('available')
  bot.user.setActivity(`${title}`, {type: `${type}`});
});
}

module.exports.say = function(bot, options) {
  const prefix = (options && options.prefix);

  bot.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
      if(command === "say") {
      nopermmsg = (options && options.nopermmsg);
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(nopermmsg);
        } else {
          message.delete()
          message.channel.send(`<@${message.author.id}> > ` + args.join(" "))
        }
      }
  })
}

module.exports.mute = function(bot, options) {
  const prefix = (options && options.prefix);

  bot.on("message", async message => {

    if(message.author.bot) return;

    if(message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
      if(command === "mute") {
        mentionerrormsg = (options && options.mentionerrormsg);
      nopermmsg = (options && options.nopermmsg);
      alreadyhasrole = (options && options.alreadyhasrole);
      roleid = (options && options.roleid);
      mutemsg = (options && options.mutemsg);
      defaultreason = (options && options.defaultreason);
      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if(!member)
        return message.channel.send(mentionerrormsg);
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.channel.send(nopermmsg);
        } else if (member.roles.cache.has(`${roleid}`)) {
          return message.channel.send(alreadyhasrole);
        } else {
          let reason = args.slice(1).join(' ');
          if(!reason) reason = defaultreason;
          var role  = message.guild.roles.cache.get(`${roleid}`);
          member.roles.add(role);
          mutemsg = mutemsg.replace(`@MUTEDUSER`, `${member.user.tag}`);
          mutemsg = mutemsg.replace(`@MUTEAUTHOR`, `${message.author.tag}`);
          mutemsg = mutemsg.replace(`@REASON`, `${reason}`);
          message.channel.send(mutemsg)
        }
      }
  })
}