// register command for users to add roles
// format: !register <gender> <pronoun> <orientation> <mtf|ftm>

// Require Role Blaster Service! Cause awesome!
var roleBlaster = require('../services/roleBlaster.js');

var register = function(message) {
  // message.client.sendMessage(message.channel, "I'm a bot! I'm working!");
  
  if (message.client.memberHasRole(message.author, roleBlaser.roles["Member"]) && !message.client.memberHasRole(message.author, roleBlaser.roles["Staff"])) {	
    message.client.sendMessage(message.channel,
      "Please ask a mod reset your tags first."
    );
  } else {
    var userRoles = [roleBlaser.roles["Member"]];
    var error = false;
  
    var userGender = roleBlaser.R.match(roleBlaser.gender, message.content);
    if (userGender.length === 0) {
      error = true;
      message.client.sendMessage(message.channel, "Must include one gender indentifier.");
    } else if (userGender.length > 1) {
      error = true;
      message.client.sendMessage(message.channel, "Cannot have more than one gender identifier.");
    } else {
      // add gender role to roles list
      userRoles.push(roleBlaser.R.compose(
        roleBlaster.normalizeToID,
        roleBlaser.R.prop(0)
      )(userGender));
    }
  
    var userGenRoles = roleBlaser.R.match(roleBlaser.genRoles, message.content);
  
    userRoles = userRoles.concat(roleBlaser.R.map(roleBlaster.normalizeToID, userGenRoles));
  
    var userTransStatus = roleBlaser.R.match(roleBlaser.transStatus, message.content);
    if (userTransStatus.length > 1) {
      error = true;
      message.client.sendMessage(message.channel, "Can only have one transition identifier");
    } else if (userTransStatus.length > 0) {
      userRoles.push(roleBlaser.R.compose(
        roleBlaster.normalizeToID,
        roleBlaser.R.prop(0)
      )(userTransStatus));
    }
  
    if(userRoles.indexOf(roleBlaser.roles["male"]) > -1 && userRoles.indexOf(roleBlaser.roles["mtf"]) > -1){
        error = true;
        message.client.sendMessage(message.channel, "Invalid selection: You can not be male and mtf");
    }

    if(userRoles.indexOf(roleBlaser.roles["female"]) > -1 && userRoles.indexOf(roleBlaser.roles["ftm"]) > -1){
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
          response = "Success! Your roles have been set."
        }
    
        message.client.sendMessage(message.channel, response);
      });
    }
  }
      
};

module.exports = register;
