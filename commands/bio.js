//Bio command

//Mongoose instantiation
var mongoose = require('mongoose');

//setup model for usage using mongoose
var Bio = require('../models/bio.js');


var bio = function(message) {
        var mentionedUser = message.mentions[0];
        if(mentionedUser == undefined){
                Bio.find({userId: message.author.id}, function(err, bio) {
                        if (err) throw err;
                        if(bio.length < 1){
                                message.client.sendMessage(message, "You do not have a bio set yet.");
                        }else{
                                message.client.sendMessage(message, "**"+message.author.mention() + "'s Bio:** \n"+ bio[0].bioText);
                        }
                });
        }else {
                Bio.find({userId: mentionedUser.id}, function(err, bio) {
                        if (err) throw err;
                        if(bio.length < 1){
                                message.client.sendMessage(message, "The user mentioned does not have a bio set yet.");
                        } else {
                                message.client.sendMessage(message, "**"+mentionedUser.mention() + "'s Bio:** \n"+ bio[0].bioText);
                        }
                });
        }

};

module.exports = bio;
