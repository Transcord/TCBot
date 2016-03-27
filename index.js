//import NPM dependencies
var Discord = require("discord.js");
var R = require("ramda");

// import commands
var commandList = require("./commands/index.js");

// load config object
var config = require("./config/config.js");

// load server references
var servers = require("./config/server.js");

// initialize Discord bot
var bot = new Discord.Client()

// server welcome message
var welcomeMessage = function(user){
  return "Welcome " + user.mention() + " to Transcord!\n\n" +
  "To get started, please use the !register command with the following options:\n" +
  "Genders (At least 1 is required): male, female, nonbinary, genderfluid, questioning\n" +
  "Pronouns: he, she, they, xe\n" +
  "Sexuality: straight, gay, lesbian, bi, pan, demi, ace, poly\n" +
  "Extras (Only 1): mtf, ftm, ally\n\n" +
  "Examples:\n" +
  "!register male\n" +
  "!register nonbinary they xe\n" +
  "!register female pan poly mtf\n\n" +
  "For any issues or tags not mentioned here, please user the !modcall command in #entry\n";
};

var messageHandler = function(commands) {
  return function(message) {
    var command = R.match(/^!(\w+)/, message.content);
    if (command.length > 1 && commands[command[1]]) {
      commands[command[1]](message);
    }
  };
};

bot.on("message", messageHandler(commandList));

bot.on("serverNewMember", function(server, user) {
  if (server.id === servers.generalId) {
    var entryChannel = server.channels.get("name", config.entryChannel);
    bot.sendMessage(entryChannel, welcomeMessage(user)); 
  }
});

bot.login(config.user.email, config.user.password, function(err, token) {
  if (err) {
    console.log("Login error: " + err);
  }
});
