// Adds user to null role, nulling them 
// format: !nullify @user 

var roles = require('../config/roles.js');

// regexes for parsing command input
var theNullRole = roles["null"];
var theMemberRole = roles["Member"];

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
        var userRoles = message.server.rolesOfUser(memberToAddRole);
        
        message.client.removeMemberFromRole(memberToAddRole, userRoles, function(err){
            var response = "";
        
            if(!err){
                message.client.addMemberToRole(memberToAddRole, theNullRole, function(err2) {
                    response = "Success! Your user has been nullified." 
                    if (err) {
                        response = "Sorry, there was an error, please message @ashelia and let her know that I'm down."
                        console.error(err, message.content);
                        return;
                    } 
                    message.client.sendMessage(message.channel, response);
                });
                return;
            }
            response = "Sorry, there was an error, please message @ashelia and let her know that I'm down."
            message.client.sendMessage(message.channel, response);
        });
    }
  }
      
};

module.exports = nullify;
