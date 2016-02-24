//import NPM dependencies
var Discord = require("discord.js");
var R = require("ramda");

// import commands
var commandList = require("./commands/index.js");

// load config object
var config = require("./config/config.js");

// initialize Discord bot
var bot = new Discord.Client()

var messageHandler = function(commands) {
  return function(message) {
    var command = R.match(/^!(\w+)/, message.content);
    if (command.length > 1 && commands[command[1]]) {
      commands[command[1]](message);
    }
  };
};

bot.on("message", messageHandler(commandList));

bot.login(config.user.email, config.user.password, function(err, token) {
  if (err) {
    console.log("Login error: " + err);
  }
});
