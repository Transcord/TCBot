// The bot can ban people run for the hills 
// format: !ban @user

var roles = require('../config/roles.js');

var ban = function(message) {  
  if (!message.client.memberHasRole(message.author, roles["Admin"])) {
    message.client.sendMessage(message.channel,
      "Only admins are allowed to ban."
    );
  } else {
    var memberToBan = message.mentions[0];
    var error = false;

    if(memberToBan == undefined){
      error = true;
      message.client.sendMessage(message.channel, "Must specify a user to ban.");
    }
  
    if (!error) {
      message.client.banMember(memberToBan, message.channel, 0, function(err) {
        var response = "";

        if (err) {
          response = "Sorry, there was an error trying to ban, please message @celkam or @ashelia and let either of them know that I'm down."
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
