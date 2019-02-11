const assert = require('assert')

const mqttConfiguration = require('../../../backend/src/configuration/mqttTemplates')
const coapConfiguration = require('../../../backend/src/configuration/coapTemplates')

describe('TS: Test MQTT configuration creation template', () => {
  const tests = [
    {
      testcaseID: 'TestCase_1',
      host: '127.0.0.1',
      port: '1883',
      clientid: 'my_client_id',
      username: 'my_user_name',
      password: 'very_strong_password_123',
      topic: '/eclipse/iot/testware/123',
      path: '/path/for/logfiles/mqtt/1234567890',
      testcases: ['tc_1', 'tc_2']
    }
  ]

  tests.forEach((t) => {
    it('TC: create MQTT configuration ' + t.testcaseID, () => {
      const configuration = mqttConfiguration(t)
      // Note: not really elegant, admittedly, but nevertheless should verify if template changed
      const lines = configuration.split(/\r?\n/)
      assert.equal(lines[0].trim(), '[MODULE_PARAMETERS]')
      assert.equal(lines[5].trim(), 'hostName := "127.0.0.1",')
      assert.equal(lines[6].trim(), 'portNumber := 1883')
      assert.equal(lines[15].trim(), 'clientId := "my_client_id",')
      assert.equal(lines[16].trim(), 'username := "my_user_name",')
      assert.equal(lines[17].trim(), 'password := "very_strong_password_123",')
      assert.equal(lines[18].trim(), 'topicName := "/eclipse/iot/testware/123"')
      assert.equal(lines[24].trim(), 'LogFile := "/path/for/logfiles/mqtt/1234567890/%e.%h-%r.%s"')
    })
  })
})

describe('TS: Test CoAP configuration creation template', () => {
  const tests = [
    {
      testcaseID: 'TestCase_1',
      host: '127.0.0.1',
      port: '5683',
      path: '/path/for/logfiles/coap/1234567890',
      testcases: ['tc_1', 'tc_2']
    }
  ]

  tests.forEach((t) => {
    it('TC: create CoAP configuration ' + t.testcaseID, () => {
      const configuration = coapConfiguration(t)
      // Note: not really elegant, admittedly, but nevertheless should verify if template changed
      const lines = configuration.split(/\r?\n/)
      assert.equal(lines[0].trim(), '[MODULE_PARAMETERS]')
      assert.equal(lines[2].trim(), 'PX_SERVER_HOST := "127.0.0.1";')
      assert.equal(lines[3].trim(), 'PX_SERVER_PORT := 5683;')
      assert.equal(lines[16].trim(), 'LogFile := "/path/for/logfiles/coap/1234567890/%e.%h-%r.%s"')
    })
  })
})
