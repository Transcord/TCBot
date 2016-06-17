// Add command to add roles 
// format: !add @user <role> <role>

// Require Ramda. Always require Ramda.
var R = require('ramda');

var roles = require('../config/roles.js');

// regexes for parsing command input
var rolesList = /\smale|\sfemale|\sgenderfluid|\snonbinary|\sgenderqueer|\sagender|\sintergender|\squestioning|\sstraight|\sgay|\slesbian|\sbi|\span|\sace|\sdemi|\spoly|\squeer|\sshe|\she|\sthey|\sxe|\smtf|\sftm|\sally|\sMember|\sSupport/ig

var normalize = R.compose(R.toLower, R.trim);

var getRoleID = R.flip(R.prop)(roles);

var normalizeToID = R.compose(
  getRoleID,
  normalize
);

var add = function(message) {
  
  if (!message.client.memberHasRole(message.author, roles["Staff"])) {
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

    var inputRoles = R.match(rolesList, message.content);
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
