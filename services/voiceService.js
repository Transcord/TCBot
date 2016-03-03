var voiceService = {
	playSong: function(message, fileToPlay, timeToPlay){
		var roles = require('../config/roles.js');

		if (!message.client.memberHasRole(message.author, roles["Staff"])) {
        	        message.client.sendMessage(message.channel, "Only staff can troll here.");
	        }else{
        	        var voiceChannel = message.author.voiceChannel;
	                if(voiceChannel !== null){
                        	message.client.joinVoiceChannel(voiceChannel, function(err, connection){
        	                        connection.playFile(fileToPlay);
	                                setTimeout(function(){
                                	        message.client.leaveVoiceChannel();
                        	        }, timeToPlay);
                	        });
        	        }
	        }
	}
};

module.exports = voiceService;
