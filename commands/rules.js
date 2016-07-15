// rules command

var rules = function(message) {  
	var messageToSend = "**Rules**: <http://tinyurl.com/gsvx747>" 
	message.client.sendMessage(message.channel, messageToSend);
};

module.exports = rules;
