// test command to see if the bot works

var callmod = function(message) {
	var config = require("../config/config.js"),
	serverConfig = require("../config/server.js"),
	modServer = message.client.servers.get("id", serverConfig.modId),
	channel = modServer.channels.get("name", config.modChannelName),
	saidMessage = " said: " + message.content.substring(9),
	fullMessage = message.author.name + " in channel: #" + message.channel.name + saidMessage;

	message.client.sendMessage(channel, fullMessage);	
};

module.exports = callmod;
