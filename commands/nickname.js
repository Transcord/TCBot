// change your nickname command

var nickname = function(message) {  
	var author = message.author;
	var newNickname = message.content.substring(9).trim().replace(/ /g,"_");
	message.client.setNickname(message, newNickname, author, function(){
		message.client.reply(message, "your nickname has been updated");
        });
};

module.exports = nickname;
