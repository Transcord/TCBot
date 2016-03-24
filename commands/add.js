// Add command to add roles 
// format: !add @user <role> <role>

// Include RoleBlaster service!
var roleBlaster = require('../services/roleBlaster.js');
// Require Ramda. Always require Ramda.
var R = require('ramda');

var add = function(message) {
  
  if (!message.client.memberHasRole(message.author, roleBlaster.roles["Staff"])) {
    message.client.sendMessage(message.channel,
      "Only staff is allowed to add roles."
    );
  } else {
    var userRoles = [];
    var memberToAddRole = message.mentions[0];
    var error = false;

    if(memberToAddRole == undefined){
      error = true;
      message.client.sendMessage(message.channel, "Must specify a user to add roll too.");
    }

    var inputRoles = R.match(roleBlaster.rolesList, message.content);
    userRoles = userRoles.concat(R.map(normalizeToID, inputRoles));

    if(userRoles.length == 0){
        error = true;
        message.client.sendMessage(message.channel, "No valid roles were selected for use. Please use only valid roles from the registration list.");
    }	

    if (!error) {
      message.client.addMemberToRole(memberToAddRole, userRoles, function(err) {
        var response = "";
    
        if (err) {
          response = "Sorry, there was an error, please message @celkam or @ashelia and let either of them know that I'm down."
          console.error(err, message.content);
        } else {
          response = "Success! Your roles have been added."
        }
    
        message.client.sendMessage(message.channel, response);
      });
    }
  }
      
};

module.exports = add;
