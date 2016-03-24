
var roleBlaster = {
	R: require('ramda'),
	roles: require('../config/roles.js'),
	gender: /\smale|\sfemale|\sgenderfluid|\snonbinary|\squestioning/i,
	genRoles: /\sstraight|\sgay|\slesbian|\sbi|\span|\sace|\sdemi|\spoly|\squeer|\sshe|\she|\sthey|\sxe/ig,
	transStatus: /\smtf|\sftm|\sally/i,
	rolesList: /\smale|\sfemale|\sgenderfluid|\snonbinary|\squestioning|\sstraight|\sgay|\slesbian|\sbi|\span|\sace|\sdemi|\spoly|\squeer|\sshe|\she|\sthey|\sxe|\smtf|\sftm|\sally|\sMember|\sSupport/ig,
	normalize: this.R.compose(this.R.toLower, this.R.trim),s
	getRoleID: this.R.flip(R.prop)(this.roles),
	normalizeToID: this.R.compose(this.getRoleID,this.normalize)
};

module.exports = roleBlaster;
