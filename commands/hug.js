// hug command

var hug = function(message) {  
	var mention = message.mentions[0];
	var messageToSend = "*hugs* ";
	if(mention == undefined){
		var onlineUsers = message.client.users.getAll("status", "online");
		messageToSend += onlineUsers[Math.floor(Math.random()*onlineUsers.length)];
	} else{
		messageToSend += message.mentions.join();
	}
	message.client.sendMessage(message.channel, messageToSend);
};

module.exports = hug;
