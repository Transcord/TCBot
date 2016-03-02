var roles = require('../config/roles.js');

var banish = function(message){
    if (message.client.memberHasRole(message.author, roles["Member"])) {
        message.client.sendMessage(message.channel,
                "Please ask a mod reset your tags first."
        );
    } else{
        var memberToBanish = message.mentions[0];

        message.client.sendMessage(message.channel, "Sending " + memberToBanish.mention() + " to the shadow realm. Goodbye!");

        message.client.createChannel(message.channel, "Shadow Realm", "voice", function(error, shadowRealm){
            message.client.moveMember(memberToBanish, shadowRealm);
            setTimeout(function() {
                message.client.deleteChannel(shadowRealm);
            }, 5000);
        });
    }
};

module.exports = banish;
