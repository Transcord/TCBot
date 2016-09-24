// hug command

var hug = function(message) {  
	var mention = message.mentions[0];
	var messageToSend = "*hugs* ";
    
    var roles = require('../config/roles.js');
    var doNotHugRole = roles["donothug"];
    
    var usersToHug = [];
    for(var user in message.mentions){
        if (!message.client.memberHasRole(message.mentions[user], doNotHugRole)) {
            usersToHug.push(message.mentions[user]);
        }
    }
    messageToSend += usersToHug.join();
    
	if(mention == undefined){
		var onlineUsers = message.client.users.getAll("status", "online");
        var userToHug = onlineUsers[Math.floor(Math.random()*onlineUsers.length)];
        if (!message.client.memberHasRole(userToHug, doNotHugRole)) {
            messageToSend += onlineUsers[Math.floor(Math.random()*onlineUsers.length)];
        }
	}
	message.client.sendMessage(message.channel, messageToSend);
};

module.exports = hug;
