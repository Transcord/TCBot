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

        if (err) {
          response = "Sorry, there was an error trying to ban. Please message @Ashelia and let her know that I'm down."
          console.error(err, message.content);
        } else {
          response = "The banhammer has been struck upon the head of " + memberToBan.username + ".";
        }
    
        message.client.sendMessage(message.channel, response);
      });
    }
  }     
};

module.exports = ban;
