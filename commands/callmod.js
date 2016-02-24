// test command to see if the bot works

var callmod = function(message) {
	var config = require("../config/config.js");
	var serverConfig = require("../config/server.js");
	var modServer = message.client.servers.get("id", serverConfig.modId);
	var channel = modServer.channels.get("name", config.modChannelName);
	var lastMessage = message.author.name + " said: " + message.content.substring(9);
	message.client.sendMessage(channel, lastMessage,{},function(){});	
};

module.exports = callmod;
