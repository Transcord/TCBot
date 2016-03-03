// rick rolling command only for mods to troll 

var rickroll = function(message) {
	var fileToPlay = __dirname + '/../media/hello.mp3';
	var voiceService = require('../services/voiceService.js');
	voiceService.playSong(message, fileToPlay, 6000);
};

module.exports = rickroll;
