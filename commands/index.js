// module to gather up all commands into an export object for the framework

var commandList = {};

require('fs').readdirSync(__dirname + '/').forEach(function(file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    var name = file.replace('.js', '');
    commandList[name] = require('./' + file);
  }
});

module.exports = commandList;
