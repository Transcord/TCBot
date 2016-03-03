// rick rolling command only for mods to troll 

var rickroll = function(message) {
	var roles = require('../config/roles.js');

	if (!message.client.memberHasRole(message.author, roles["Staff"])) {
    		message.client.sendMessage(message.channel, "Only staff can troll here.");
	}else{
		var config = require('../config/config.js');
		var voiceChannel = getMostMemberChannel(message.channel.server.channels.getAll("type", "voice"), config.channelsToTrollIgnore);
	        message.client.joinVoiceChannel(voiceChannel, function(err, connection){
                	var fileToPlay = __dirname + '/../media/rickroll.mp3';
                	connection.playFile(fileToPlay);
			setTimeout(function(){
				connection.destroy();
			}, 8000);
        	});

	}
};


var getMostMemberChannel = function(voiceChannels, channelsToIgnore) {
	var maxChannelLength = 0,
        maxChannel = null;
	//Loop through channels to ignore and removes them from possible ones.
	for(var chan in channelsToIgnore){
		if(voiceChannels.has('name', channelsToIgnore[chan])){
        	        voiceChannels.remove(voiceChannels.get('name', channelsToIgnore[chan]));
	        }
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
