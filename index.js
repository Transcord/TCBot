//import NPM dependencies
var Discord = require("discord.js");
var R = require("ramda");

// import commands
var commandList = require("./commands/index.js");

// initialize Knex and set up the sqlite connection
var knex = require('knex')({
  client: 'sqlite3',
  // debug: true,
  connection: {
    filename: "./data.sqlite"
  }
});

// load config object
var config = require("./config/config.js");

// initialize Discord bot
var bot = new Discord.Client()

var messageHandler = function(commands, bot) {
	
  return function(message) {
    var command = R.match(/^!(\w+)/, message.content);
	//console.log(command);
    if (command.length > 1 && commands[command[1]]) {
		
      commands[command[1]](message, bot);
    }
  };
};

bot.on("message", messageHandler(commandList, bot));
//bot.on("message", function(message){
	//messageHandler(commandList, message);
//});

bot.login(config.user.email, config.user.password, function(err, token) {
  if (err) {
    console.log("Login error: " + err);
  }
});


bot.on("serverNewMember", (objServer, objUser) => {
	
	//console.log("dicks");
	cake = "**Welcome ";
	cake = cake.concat(objUser.mention());
	cake = cake.concat(" to Transcord!** To access the rest of the server, " +
		"use the register command: ``!register male|female|nonbinary|genderfluid|questioning " +
		"she|he|they straight|gay|bi|pan mtf|ftm``  Please choose a " +
		"gender tag. All other tags are optional.\nIf you have any questions, " +
		"please contact a staff member. ");
	
	//bot.channels.length - 1 is always going to be entry 
	bot.sendMessage(bot.channels[bot.channels.length - 1], cake);
	
});


