// register command for users to add roles
// format: !register <gender> <pronoun> <orientation> <mtf|ftm>

// Require Ramda. Always require Ramda.
var R = require('ramda');

var roles = require('../config/roles.js');

// regexes for parsing command input
var gender = /\smale|\sfemale|\sgenderfluid|\sgenderqueer|\sagender|\sintergender|\snonbinary|\squestioning/i
var genRoles = /\sstraight|\sgay|\slesbian|\sbi|\span|\sace|\sdemi|\spoly|\squeer|\sshe|\she|\sthey|\sxe/ig
var transStatus = /\smtf|\sftm|\sally/i

var normalize = R.compose(R.toLower, R.trim);

var getRoleID = R.flip(R.prop)(roles);

var normalizeToID = R.compose(
  getRoleID,
  normalize
);

var register = function(message) {
  // message.client.sendMessage(message.channel, "I'm a bot! I'm working!");
  
  if (message.client.memberHasRole(message.author, roles["Member"]) && !message.client.memberHasRole(message.author, roles["Staff"])) {	
    message.client.sendMessage(message.channel,
      "Please ask a mod reset your tags first."
    );
  } else {
    var userRoles = [roles["Member"]];
    var error = false;
  
    var userGender = R.match(gender, message.content);
    if (userGender.length === 0) {
      error = true;
      message.client.sendMessage(message.channel, "Must include one gender identifier.");
    } else if (userGender.length > 1) {
      error = true;
      message.client.sendMessage(message.channel, "Cannot have more than one gender identifier.");
    } else {
      // add gender role to roles list
      userRoles.push(R.compose(
        normalizeToID,
        R.prop(0)
      )(userGender));
    }
  
    var userGenRoles = R.match(genRoles, message.content);
  
    userRoles = userRoles.concat(R.map(normalizeToID, userGenRoles));
  
    var userTransStatus = R.match(transStatus, message.content);
    if (userTransStatus.length > 1) {
      error = true;
      message.client.sendMessage(message.channel, "Can only have one transition identifier");
    } else if (userTransStatus.length > 0) {
      userRoles.push(R.compose(
        normalizeToID,
        R.prop(0)
      )(userTransStatus));
    }
  
    if(userRoles.indexOf(roles["male"]) > -1 && userRoles.indexOf(roles["mtf"]) > -1){
        error = true;
        message.client.sendMessage(message.channel, "Invalid selection: You can not be male and mtf");
    }

    if(userRoles.indexOf(roles["female"]) > -1 && userRoles.indexOf(roles["ftm"]) > -1){
        error = true;
        message.client.sendMessage(message.channel, "Invalid selection: You can not be female and ftm");
    }

    if (!error) {
      message.client.addMemberToRole(message.author, userRoles, function(err) {
        var response = "";
    
        if (err) {
          response = "Sorry, there was an error, please message @celkam and let her know that I'm down."
          console.error(err, message.content);
        } else {
          response = "Success! Your roles have been set. Welcome and check out the rules in #transcord-info"
        }
    
        message.client.sendMessage(message.channel, response);
      });
    }
  }
      
};

module.exports = register;
