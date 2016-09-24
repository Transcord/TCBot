// check if user has been on server for 24 hours if has pms them a link to t18+

var imanadult = function(message) {
  
    var createdAtTimestamp = Math.round(message.author.createdAt.getTime() / 1000);
    var ts = Math.round(new Date().getTime() / 1000);
    var tsYesterday = ts - (24 * 3600);
    
    if(tsYesterday >= createdAtTimestamp){
        message.client.sendMessage(message.author, 'https://discord.gg/0wDu0KUT8wxt3QlW');
    } else{
        message.client.sendMessage(message.author, 'You have not been a member for 24 hours yet, please try again later.');
    }
};

module.exports = imanadult;
