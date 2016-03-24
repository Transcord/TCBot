// Require Ramda. Always require Ramda.
var R = require('ramda');

var roleBlaster = {
	roles: require('../config/roles.js'),
	gender: /\smale|\sfemale|\sgenderfluid|\snonbinary|\squestioning/i,
	genRoles: /\sstraight|\sgay|\slesbian|\sbi|\span|\sace|\sdemi|\spoly|\squeer|\sshe|\she|\sthey|\sxe/ig,
	transStatus: /\smtf|\sftm|\sally/i,
	rolesList: /\smale|\sfemale|\sgenderfluid|\snonbinary|\squestioning|\sstraight|\sgay|\slesbian|\sbi|\span|\sace|\sdemi|\spoly|\squeer|\sshe|\she|\sthey|\sxe|\smtf|\sftm|\sally|\sMember|\sSupport/ig,
	normalize: R.compose(R.toLower, R.trim),
	getRoleID: R.flip(R.prop)(this.roles),
	normalizeToID: R.compose(this.getRoleID,this.normalize)
};

module.exports = roleBlaster;
