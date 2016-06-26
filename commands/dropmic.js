// Allows staff to drop the mic 

var roles = require('../config/roles.js');

var dropmic = function(message) {
  
  if (!message.client.memberHasRole(message.author, roles["Staff"])) {
    message.client.sendMessage(message.channel,
      "Only staff is allowed to null users."
    );
  } else {
      message.client.sendMessage(message.channel, "http://i.giphy.com/KL7I5MXrcvezC.gif");
  }
      
};

module.exports = dropmic;
