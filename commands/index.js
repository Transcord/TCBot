// module to gather up all commands into an export object for the framework

var commandList = {};

commandList.test = require("./test.js");

module.exports = commandList;
