const assert = require('assert')
const pathHelper = require('../../../backend/src/helpers/pathHelper')

describe('TS: getting the storage paths', function () {
  it('TC:  generate path', function () {
    const res = pathHelper.storagePath('mqtt', '123')
    const pathElements = res.split('/')

    // should generate: .../resources/history/mqtt/123
    assert.equal(pathElements.pop(), '123')
    assert.equal(pathElements.pop(), 'mqtt')
    assert.equal(pathElements.pop(), 'history')
    assert.equal(pathElements.pop(), 'resources')
  })
})

describe('TS: getting the storage path base', function () {
  it('TC:  generate path', function () {
    const res = pathHelper.storagePath()
    const pathElements = res.split('/')

    // should generate: .../resources/history/
    assert.equal(pathElements.pop(), 'history')
    assert.equal(pathElements.pop(), 'resources')
  })
})

describe('TS: getting the resources paths', function () {
  it('TC:  generate path', function () {
    const res = pathHelper.resourcesPath('testcases', 'coap_server_testcases.json')
    const pathElements = res.split('/')

    // should generate: .../resources/testcases/coap_server_testcases.json
    assert.equal(pathElements.pop(), 'coap_server_testcases.json')
    assert.equal(pathElements.pop(), 'testcases')
    assert.equal(pathElements.pop(), 'resources')
  })
})

describe('TS: getting the binaries paths', function () {
  it('TC:  generate path', function () {
    const res = pathHelper.binariesPath('iottestware.mqtt')
    const pathElements = res.split('/')

    // should generate: .../bin/iottestware.mqtt
    assert.equal(pathElements.pop(), 'iottestware.mqtt')
    assert.equal(pathElements.pop(), 'bin')
  })
})
