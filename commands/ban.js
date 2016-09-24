// The bot can ban people run for the hills 
// format: !ban @user x
// default x = 1 day (of messages to delete)

var roles = require('../config/roles.js');

var ban = function(message) {  
  if (!message.client.memberHasRole(message.author, roles["Staff"])) {
    message.client.sendMessage(message.channel,
      "Only staff are allowed to ban."
    );
  } else {
    var memberToBan = message.mentions[0];
    var error = false;

    if(memberToBan == undefined){
      error = true;
      message.client.sendMessage(message.channel, "Must specify a user to ban.");
    }
  
    if (!error) {
      message.client.banMember(memberToBan, message.channel, 1, function(err) {
        var response = "";

        response = "The banhammer has been struck upon the head of " + memberToBan.username + ".";
        if (err) {
          response = "Sorry, there was an error trying to ban. Please message @Ashelia and let her know that I'm down."
          console.error(err, message.content);
        } 
        var config = require("../config/config.js"),
        serverConfig = require("../config/server.js"),
        modServer = message.client.servers.get("id", serverConfig.modId),
        channel = modServer.channels.get("name", config.banWarningLogChannel);
          
        message.client.sendMessage(message.channel, response);
      });
    }
  }     
};

module.exports = ban;
