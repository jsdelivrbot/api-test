'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var APISchema = new Schema({
	key: {
		type: String,
		Required: 'Kindly enter the key'
	},
	value: {
		type: String,
		Required: 'Kindly enter the value'
	},
	timestamp: {
		type: Date,
		Required: 'Kindly enter the timestamp'
	},
	status: {
		type: [{
			type: String,
			enum: ['pending', 'ongoing', 'completed']
		}],
		default: ['pending']
	}
});

module.exports = mongoose.model('API', APISchema);