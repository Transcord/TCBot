// Adds user to null role, nulling them 
// format: !nullify @user 

var roles = require('../config/roles.js');

// regexes for parsing command input
var theNullRole = roles["null"];

var nullify = function(message) {
  
  if (!message.client.memberHasRole(message.author, roles["Staff"])) {
    message.client.sendMessage(message.channel,
      "Only staff is allowed to null users."
    );
  } else {
    var memberToAddRole = message.mentions[0];
    var error = false;

    if(memberToAddRole == undefined){
      error = true;
      message.client.sendMessage(message.channel, "Must specify a user to null.");
    }

    if (!error) {
      message.client.addMemberToRole(memberToAddRole, theNullRole, function(err) {
        var response = "";
    
        if (err) {
          response = "Sorry, there was an error, please message @celkam or @ashelia and let either of them know that I'm down."
          console.error(err, message.content);
        } else {
          response = "Success! Your user has been nullified."
        }
    
        message.client.sendMessage(message.channel, response);
      });
    }
  }
      
};

module.exports = nullify;
