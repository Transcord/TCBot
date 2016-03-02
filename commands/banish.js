var roles = require('../config/roles.js');

var banish = function(message){
    if (message.client.memberHasRole(message.author, roles["Staff"])) {
        var memberToBanish = message.mentions[0];

        message.client.sendMessage(message.channel, "Sending " + memberToBanish.mention() + " to the shadow realm. Goodbye!");

        message.client.createChannel(message.channel, "Shadow Realm", "voice", function(error, shadowRealm){
            message.client.moveMember(memberToBanish, shadowRealm);
            setTimeout(function() {
                message.client.deleteChannel(shadowRealm);
            }, 5000);
        });
    } else{
        message.client.sendMessage(message.channel,
                "Only Staff can banish people."
        );
    }
};

module.exports = banish;
