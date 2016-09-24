// denullifys a user, removing them from the null role
// format: !add @user <role> <role>

var roles = require('../config/roles.js');

// regexes for parsing command input
var theNullRole = roles["null"];
var theMemberRole = roles["Member"];

var denull = function(message) {
  
  if (!message.client.memberHasRole(message.author, roles["Staff"])) {
    message.client.sendMessage(message.channel,
      "Only staff is allowed to denull users."
    );
  } else {
    var memberToAddRole = message.mentions[0];
    var error = false;

    if(memberToAddRole == undefined){
      error = true;
      message.client.sendMessage(message.channel, "Must specify a user to denull.");
    }

    if (!error) {
	  message.client.removeMemberFromRole(memberToAddRole, theNullRole, function(err) {
		var response = "";
        
        if(err){
			response = "Sorry, there was an error, please message @ashelia and let her know that I'm down."
			message.client.sendMessage(message.channel, response);
		}
	  });
	  
    }
  }
      
};

module.exports = denull;
