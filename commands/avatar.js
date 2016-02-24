// avatar command

var avatar = function(message) {  
	try{
		message.client.reply(message, message.mentions[0].avatarURL);
	}		
	catch(err){
		message.client.reply(message, "Please enter a valid username.");
	}	
};

module.exports = avatar;
