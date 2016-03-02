// register command for users to add roles
// format: !register <gender> <pronoun> <orientation> <mtf|ftm>

// Require Ramda. Always require Ramda.
var R = require('ramda');

var roles = require('../config/roles.js');

// regexes for parsing command input
var rolesList = /\smale|\sfemale|\sgenderfluid|\snonbinary|\squestioning|\sstraight|\sgay|\slesbian|\sbi|\span|\sace|\sdemi|\spoly|\squeer|\sshe|\she|\sthey|\sxe|\smtf|\sftm|\sally/i

var normalize = R.compose(R.toLower, R.trim);

var getRoleID = R.flip(R.prop)(roles);

var normalizeToID = R.compose(
  getRoleID,
  normalize
);

var strip = function(message) {
  // message.client.sendMessage(message.channel, "I'm a bot! I'm working!");
  
  if (message.client.memberHasRole(message.author, roles["Member"])) {
    message.client.sendMessage(message.channel,
      "Please ask a mod reset your tags first."
    );
  } else {
    var userRoles = [roles["Member"]];
    var memberToStrip = message.mentions[0];
    var error = false;

    if(memberToStrip == undefined){
      error = true;
      message.client.sendMessage(message.channel, "Must specify a user to strip.");
    }

    var inputRoles = R.match(rolesList, message.content);

    if (inputRoles.length === 0) {
      error = true;
      message.client.sendMessage(message.channel, "Must include a role to strip or user may already be naked(null).");
    } else {
      // add gender role to roles list
      userRoles.push(R.compose(
        normalizeToID,
        R.prop(0)
      )(inputRoles));
    }
  
    if (!error) {
      message.client.removeMemberFromRole(message.author, userRoles, function(err) {
        var response = "";
    
        if (err) {
          response = "Sorry, there was an error, please message @celkam or @ashelia and let either of them know that I'm down."
          console.error(err, message.content);
        } else {
          response = "Success! Your roles have been set."
        }
    
        message.client.sendMessage(message.channel, response);
      });
    }
  }
      
};

module.exports = strip;
