const should = require('chai').should;
const postcondo = require('../public/js/postcondo.js');

describe('postcondo', function() {
	beforeEach(function() {
		this.xhr = sinon.useFakeXMLHttpRequest();

		this.requests = [];

		this.xhr.onCreate = function(xhr) {
			this.requests.push(xhr);
		}.bind(this);
	});

	afterEach(function() {
		this.xhr.restore();
	});

	it('should parse returned data as JSON', function(done) {
		let data = { key: 'value'};
		let dataJson = JSON.stringify(data);

		postcondo.post(function(err, result) {
			result.should.deep.equal(data);
			done();
		});

	console.log(dataJson);
	});
});