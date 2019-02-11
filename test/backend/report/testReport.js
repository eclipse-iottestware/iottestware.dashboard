'use strict'

const assert = require('assert')

const Report = require('../../../backend/src/report/Report')
const fileHelper = require('../../../backend/src/helpers/fileHelper')
const pathHelper = require('../../../backend/src/helpers/pathHelper')

describe('TS: Create Report', () => {
  let tests = [
    {
      title: 'MQTT Test Report',
      protocol: 'mqtt',
      timestamp: 123456789,
      results: [
        {
          result: {
            'timestamp': new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            'testcase': 'TC_MQTT_Broker_CONNECT_001',
            'verdict': 'pass',
            'reason': 'some reason for the executed test run'
          },
          purpose: {
            'id': 'TP_MQTT_Broker_CONNECT_001',
            'objective': 'The IUT MUST close the network connection if fixed header flags in CONNECT Control Packet are invalid',
            'reference': '[MQTT-2.2.2-1], [MQTT-2.2.2-2], [MQTT-3.1.4-1], [MQTT-3.2.2-6]',
            'PICS': [
              'PICS_BROKER_BASIC'
            ],
            'init': '',
            'expected': "\tensure that {\n\t\twhen {\n\t\t\tthe IUT entity receives a CONNECT message containing\n\t\t\theader_flags indicating value '1111'B;\n\t\t}\n\t\tthen {\n\t\t\tthe IUT entity closes the TCP_CONNECTION\n\t\t}\n\t}\n"
          }
        }
      ]
    }
  ]

  tests.forEach((test) => {
    it('TC: Create Report ' + test.protocol + ' possible?', () => {
      const report = new Report(test.title, new Date().toLocaleString())
      report.appendSection('Test Results')

      test.results.forEach(tr => {
        report.appendToSection(tr.result, tr.purpose)
      })

      report.save(test.protocol, test.timestamp)
      assert.equal(fileHelper.uriExist(pathHelper.storagePath(test.protocol, test.timestamp, 'report.pdf')), true)
    })
  })
})
