// test command to see if the bot works

var callmod = function(message) {
	var config = require("./config/config.js");
	var channel = message.client.servers[0].channels.get("name", config.modChannelName);
	var lastMessage = message.author.name + " said: " + message.content.substring(9);
	message.client.sendMessage(channel, lastMessage,{},function(){});	
};

module.exports = callmod;
