// Adele Hello command only for mods to troll 

var hello = function(message) {
	var fileToPlay = __dirname + '/../media/hello.mp3';
	var voiceService = require('../services/voiceService.js');
	voiceService.playSong(message, fileToPlay, 6000);
};

module.exports = hello;
