'use strict';

var mongoose = require('mongoose'),
	API = mongoose.model('API');

	exports.list = list();
	exports.update = update();
	exports.retrieveByKey = retrieveByKey();
	exports.deleteAll = deleteAll();

	function list () {
		return function (_request, _response) {
			API.find({}, function(_error, _data) {
				if (_error || !_data) {
					_response.send(_error);
				}
				
				var tempList = [];
				for (var i in _data) {
					tempList.push({
						"key": _data[i].key, 
						"value": _data[i].value,
						"timestamp": convertTimeFormat(_data[i].timestamp)
					});
				}

				_response.json(tempList);
			});
		};
	};

	function update () {
		return function(_request, _response) {
			if (typeof _request.body == 'object' && Object.keys(_request.body).length > 0) {
				for (var i of Object.keys(_request.body)) {
					var paramsObj = {
						key: i,
						value: _request.body[i]
					}

					API.findOneAndUpdate( { key: i, timestamp: new Date() }, 
						{ 
							$set: paramsObj,
							$setOnInsert: { 
								timestamp: new Date()
							}
						}, 
						{ 	
							new: true, 
							upsert: true 
						},
					function (_error, _data) {
						if (_error || !_data) {
							_response.send(_error);
						}

						_response.json({
							"key": _data.key, 
							"value": _data.value, 
							"timestamp": convertTimeFormat(_data.timestamp)
						});
					});
				}
			}
		}
	};

	function retrieveByKey () {
		return function(_request, _response) {
			var paramsObj = {
				key: _request.params.key
			}

			if (_request.query && _request.query.timestamp) {
				if (_request.query.timestamp.length == 10) {
					paramsObj.timestamp = new Date(parseInt(_request.query.timestamp) * 1000);
				} else {
					paramsObj.timestamp = {
						"$lte": new Date(parseInt(_request.query.timestamp))
					}
				}
			}

			API.findOne(paramsObj, function(_error, _data) {
				if (_error || _data == null) {
					_response.send(_error);
				} else {
					_response.json({
						"key": _data.key, 
						"value": _data.value, 
						"timestamp": convertTimeFormat(_data.timestamp)
					});
				}
			}).sort( { "timestamp": -1}).limit(1);
		};
	};

	function convertTimeFormat (_timestamp) {		
		return new Date(_timestamp).toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: true });
	};

	function deleteAll () {
		return function (_request, _response) {
			API.remove({}, function(_error, _data) {
			    if (_error || !_data) {
			      _response.send(_error);
			    }
			    _response.json({ message: 'Deleted Successfully' });
			});
		};
	};