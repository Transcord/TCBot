//Sends a message to a specific channel that only mods have access to. 

var callmod = function(message) {
	var config = require("../config/config.js");
	var channel = message.channel; 
	var lastMessage = message.author.name + " said: " + message.content.substring(9);
	message.client.sendMessage(channel, lastMessage,{},function(){});	
};

module.exports = callmod;
