//var assert = require('assert');
var Battle = require('../lib/Battle');

//require('chai').should();
var assert = require('chai').assert;
var expect = require('chai').expect();

describe('Test de text', function() {

	it('should do something', function() {

		var a = 3;
		assert.equal(a*2, 6, "didn't work");

	});
});

describe('Get Persos', function() {

	it('should not be undefined', function() {
		assert.notEqual(Battle.persos, undefined);
	});

	it('should return perso 0 is Sangoku', function() {
		assert.equal(Battle.persos()[0].name, 'Sangoku');
	});

	it('should return perso 20 is Saitama', function() {
		assert.equal(Battle.persos()[20].name, 'Saitama');
	});

});
