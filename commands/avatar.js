// avatar command

var avatar = function(message, bot) {  

	try{
		bot.reply(message, message.mentions[0].avatarURL);
	}		
	catch(err){
		bot.reply(message, "Please enter a username.");
	}	
};

module.exports = avatar;

