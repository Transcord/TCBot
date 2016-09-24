//Set Bio command

//Mongoose instantiation
var mongoose = require('mongoose');

//setup model for usage using mongoose
var Bio = require('../models/bio.js');


var setbio = function(message) {

        var bioText = message.content.substring(7).trim();
        Bio.find({userId: message.author.id}, function(err, bios) {
                if (err) throw err;

                if(bios.length > 0){
                        bios[0].bioText = bioText;
                        bios[0].save(function(err) {
                                if (err) throw err;
                                message.client.reply(message, "Bio has been updated!");
                        });
                }else{
                        var newBio = Bio({
                                userId: message.author.id,
                                bioText: bioText
                        });

                        newBio.save(function(err) {
                                if (err) throw err;
                                message.client.reply(message, "New bio added!");
                        });
                }
        });

};

module.exports = setbio;
