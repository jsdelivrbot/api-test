'use strict';
module.exports = function(app) {
	var apiController = require('../controllers/api.controller');

	app.route('/api/list')
	.get(apiController.list);

	app.route('/api')
	.post(apiController.update);

	app.route('/api/deleteAll')
	.post(apiController.deleteAll);

	app.route('/api/:key')
	.get(apiController.retrieveByKey);
};