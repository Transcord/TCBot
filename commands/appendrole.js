// register command for users to add roles
// format: !register <gender> <pronoun> <orientation> <mtf|ftm>

// Require Ramda. Always require Ramda.
var R = require('ramda');

var roles = require('../config/roles.js');

// regexes for parsing command input
var gender = /\smale|\sfemale|\sgenderfluid|\snonbinary|\squestioning/i
var genRoles = /\sstraight|\sgay|\slesbian|\sbi|\span|\sace|\sdemi|\spoly|\squeer|\sshe|\she|\sthey|\sxe/ig
var transStatus = /\smtf|\sftm/i

var normalize = R.compose(R.toLower, R.trim);

var getRoleID = R.flip(R.prop)(roles);

var normalizeToID = R.compose(
  getRoleID,
  normalize
);

//Checks wheter the user has already registered.  
function appendrole(message, bot){
	bot.reply(message, 'Setting Roles...', function() {
			registerUser(message, bot);
			return;
	});	
			
		
}

	
var registerUser = function(message, bot) {
  // message.client.sendMessage(message.channel, "I'm a bot! I'm working!");
  
	
  var userRoles = [roles["Member"]];
  var error = false;

  var userGender = R.match(gender, message.content);
  if (userGender.length >= 1){
	 userRoles.push(R.compose(
    normalizeToID,
    R.prop(0)
    )(userGender));
  }

  var userGenRoles = R.match(genRoles, message.content);

  userRoles = userRoles.concat(R.map(normalizeToID, userGenRoles));

  var userTransStatus = R.match(transStatus, message.content);
  if (userTransStatus.length >= 1) {
    error = true;
    //message.client.sendMessage(message.channel, "Can only have one transition identifier");
	bot.reply(message, "Can only have one transition identifier.  Please message a mod or admin to change your Mtf or FtM tag.");
  } 

  if (!error) {
    message.client.addMemberToRole(message.author, userRoles, function(err) {
      var response = "";
  
      if (err) {
        response = "Sorry, there was an error, please message a mod or admin."
        console.error(err, message.content);
		
      } else {
        response = "Success! Your roles have been set."
      }
  
      //message.client.sendMessage(message.channel, response);
	  bot.reply(message, response);
    });
  }
      
};

module.exports = appendrole;
