// rick rolling command only for mods to troll 

var rickroll = function(message) {
	var fileToPlay = __dirname + '/../media/rickroll.mp3';
	var voiceService = require('../services/voiceService.js');
	voiceService.playSong(message, fileToPlay, 8000);
};

module.exports = rickroll;
