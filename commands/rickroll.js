// rick rolling command only for mods to troll 

var rickroll = function(message) {
	var roles = require('../config/roles.js');
	var config = require('../config/config.js');

	if (!message.client.memberHasRole(message.author, roles["Staff"])) {
    		message.client.sendMessage(message.channel, "Only staff can troll here.");
	}else{
		var voiceChannel = getMostMemberChannel(message.channel.server.channels.getAll("type", "voice"), config.afkChannelId);
	        message.client.joinVoiceChannel(voiceChannel, function(err, connection){
                	var fileToPlay = __dirname + '/../media/rickroll.mp3';
                	connection.playFile(fileToPlay);
			setTimeout(function(){
				connection.destroy();
			}, 8000);
        	});

	}
};


var getMostMemberChannel = function(voiceChannels, afkChannelId) {
	var maxChannelLength = 0,
        maxChannel = null;
	//Remove AFK Channel From voiceChannels
	afkChannelId = afkChannelId || null;
	console.log(afkChannelId);
	if(afkChannelId !== null){
		voiceChannels.remove(afkChannelId);
	}
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
