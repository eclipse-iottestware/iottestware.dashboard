const assert = require('assert')

const validator = require('../../../backend/src/helpers/inputValidator')

describe('TS: validator.isValidHost()', function() {
  let tests = [
    {arg: '127.0.0.1', expected: true},
    {arg: 'localhost', expected: true},
    {arg: '0.0.0.0', expected: true},
    {arg: '255.255.255.255', expected: true},
    {arg: 'http://www.eclipse.org', expected: true},
    {arg: 'https://www.eclipse.org', expected: true},
    {arg: 'eclipse.org', expected: true},
    {arg: 'iot.eclipse.org', expected: true},

    {arg: '0', expected: false},
    {arg: '255', expected: false},
    {arg: '-1', expected: false},
    {arg: '-1.-1.-1.-1', expected: false},
    {arg: '256.256.256.256', expected: false},
    {arg: 'eclipse', expected: false},
  ]

  tests.forEach(function(test) {
    it('TC: Hostname/IP ' + test.arg + ' valid?', function() {
      let res = validator.isValidHost(test.arg)
      assert.equal(res, test.expected)
    })
  })
})

describe('TS: validator.inRange()', function() {
  let tests = [
    {input: 0, min: 0, max: 5, expected: true},
    {input: '0', min: '0', max: '5', expected: true},
    {input: 5, min: 0, max: 5, expected: true},
    {input: '5', min: '0', max: '5', expected: true},
    {input: -5, min: -5, max: 5, expected: true},
    {input: '-5', min: '-5', max: '5', expected: true},
    {input: -1, min: 0, max: 5, expected: false},
    {input: 6, min: 0, max: 5, expected: false},
    {input: 'abc', min: 0, max: 5, expected: false},
    {input: 6, min: 'abc', max: 'abc', expected: false},
  ]

  tests.forEach(function(test) {
    it('TC: ' + test.input + ' in Range(' + test.min + '..' + test.max + ')?', function() {
      let res = validator.inRange(test.input, test.min, test.max)
      assert.equal(res, test.expected)
    })
  })
})

describe('TS: validator.isValidPort()', function() {
  let tests = [
    {port: 1, expected: true},
    {port: '1', expected: true},
    {port: 80, expected: true},
    {port: 8080, expected: true},
    {port: 1883, expected: true},
    {port: 8883, expected: true},
    {port: 5683, expected: true},
    {port: 65535, expected: true},
    {port: '65535', expected: true},
    {port: 0, expected: false},
    {port: '0', expected: false},
    {port: 65536, expected: false},
    {port: -1, expected: false},
    {port: 'port', expected: false},
  ]

  tests.forEach(function(test) {
    it('TC: is ' + test.port + ' a valid port?', function() {
      let res = validator.isValidPort(test.port)
      assert.equal(res, test.expected)
    })
  })
})

describe('TS: validator.containsNoSpaces()', function() {
  let tests = [
    {resource: '', expected: true},
    {resource: ' ', expected: false},
    {resource: 'Simple_Resource', expected: true},
    {resource: 'Simple Resource', expected: false},
    {resource: '/v1/4bb415c8-2c5b-48af-9a0e-46c34f7672e4/', expected: true},
    {resource: '/v1/4bb415c8-2c5b 48af 9a0e 46c34f7672e4/', expected: false},
    {resource: 'Resource ', expected: false},
    {resource: ' Resource', expected: false},
  ]

  tests.forEach(function(test) {
    it('TC: "' + test.resource + '" contains any spaces?', function() {
      let res = validator.containsNoSpaces(test.resource)
      assert.equal(res, test.expected)
    })
  })
})
