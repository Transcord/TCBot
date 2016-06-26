// hotlines command

var hotlines = function(message) {  
	var messageToSend = "**100 Reasons to Not Kill Yourself**: <http://tinyurl.com/jyse52u>" +
		"**International Suicide Helplines**: <http://www.suicide.org/international-suicide-hotlines.htm>l" +
		"**The Trevor Project**: <http://www.thetrevorproject.org> | (866)-488-7386" +
		"**Trans Lifeline: US**: (877)-565-8860 | Canada: (877)-330-6366";
	message.client.sendMessage(message.channel, messageToSend);
};

module.exports = hotlines;
