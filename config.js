"use strict";

var beType = 'http';
var beIPAddress = 'localhost';
var bePort = '6565';
var beServiceNames = {
	auth: 'auth',
	getTasks: 'getTasks',
	taskCreate: 'taskCreate',
	taskChange: 'taskChange',
	taskDelete: 'taskDelete'
};
var salt = '$2a$10$Dlr3LzJvNPnCnhtBeSyA8.';
var beString = "".concat(beType, "://").concat(beIPAddress, ":").concat(bePort, "/");
var config = {
	beString: beString,
	bePort: bePort,
	beServiceNames: beServiceNames,
	refreshTime: 60000,
	salt: salt
};

exports.config = config;