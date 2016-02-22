// test command to see if the bot works

var test = function(message) {
  message.client.sendMessage(message.channel, "I'm a bot! I'm working!");
};

module.exports = test;
