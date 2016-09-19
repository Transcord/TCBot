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
  
  "To get started, please use ``!register gender pronouns sexuality extras`` with the following options:\n" +
  "Genders (required): male, female, nonbinary, genderfluid, genderqueer, intergender, agender, questioning\n" +
  "Pronouns: he, she, they, xe\n" +
  "Sexuality: straight, gay, lesbian, bi, pan, demi, ace, poly, queer\n" +
  "Extras (Only 1): mtf, ftm, ally\n" +
  "Only gender is required. Private rooms available for mtf, ftm, and all nonbinary genders.\n\n"+
  
  "Examples:\n" +
  "!register female she mtf ace\n" +
  "!register male he ftm\n" +
  "!register genderfluid they she\n" +
  "!register nonbinary he ftm pan poly\n" +
  "!register questioning mtf they\n\n" +

  "For any issues or tags not mentioned here, please use the !callmod command in #entry\n";
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
    setTimeout(function() {
      bot.sendMessage(entryChannel, welcomeMessage(user)); 
    }, 5000);
  }
});

bot.login(config.user.email, config.user.password, function(err, token) {
  if (err) {
    console.log("Login error: " + err);
  }
});
