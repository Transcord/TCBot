// rick rolling command to see if the bot works

var rickroll = function(message) {
	var roles = require('../config/roles.js');


	if (!message.client.memberHasRole(message.author, roles["Staff"])) {
    		message.client.sendMessage(message.channel, "Only staff can troll here.");
	}else{
		var voiceChannel = getMostMemberChannel(message.channel.server.channels.getAll("type", "voice"));
	        message.client.joinVoiceChannel(voiceChannel, function(err, connection){
                	var fileToPlay = __dirname + '/../media/rickroll.mp3';
                	connection.playFile(fileToPlay);
                	connnection.destroy();
        	});

	}
};


var getMostMemberChannel = function(voiceChannels) {
	var maxChannelLength = 0,
        maxChannel = null;
	//Loop through voice channels to determine largest room
        for(var length = voiceChannels.length, i = 0; i < length; i++){
                if(voiceChannels[i].members.length > maxChannelLength) {
                        maxChannelLength = voiceChannels[i].members.length;
                        maxChannel = i;
                }
        }

	return voiceChannels[maxChannel];
};

module.exports = rickroll;
