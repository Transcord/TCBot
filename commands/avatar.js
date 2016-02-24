// avatar command

var avatar = function(message) {  
	var mention = message.mentions[0];
	if(mention == undefined){
		message.client.reply(message, "Please enter a valid username.");
	}else{
		message.client.reply(message, mention.avatarURL);
	}
};

module.exports = avatar;
