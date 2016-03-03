// rick rolling command only for mods to troll 

var rickroll = function(message) {
	var roles = require('../config/roles.js');

	if (!message.client.memberHasRole(message.author, roles["Staff"])) {
    		message.client.sendMessage(message.channel, "Only staff can troll here.");
	}else{
		var voiceChannel = message.author.voiceChannel;
		if(voiceChannel !== null){
	      		message.client.joinVoiceChannel(voiceChannel, function(err, connection){
                		var fileToPlay = __dirname + '/../media/rickroll.mp3';
               		 	connection.playFile(fileToPlay);
				setTimeout(function(){
					connection.destroy();
				}, 8000);
        		});
		}
	}
};

module.exports = rickroll;
