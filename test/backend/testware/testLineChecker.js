const assert = require('assert')

const lineChecker = require('../../../backend/src/testware/lineChecker')

describe('TS: check the lineChecker', () => {
  const tests = [
    {
      line: 'Test case TC_MQTT_BROKER_CONNECT_005 finished. Verdict: pass reason: IUT closed the Network Connection correctly',
      logType: 'tty',
      expected: {testcase: 'TC_MQTT_BROKER_CONNECT_005', verdict: 'pass', reason: 'IUT closed the Network Connection correctly'}
    }, {
      line: 'MTC@lxndr: Test case TC_MQTT_BROKER_CONNECT_015 finished. Verdict: fail reason: IUT MUST close the Network Connection',
      logType: 'tty',
      expected: {testcase: 'TC_MQTT_BROKER_CONNECT_015', verdict: 'fail', reason: 'IUT MUST close the Network Connection'}
    }, {
      line: '2018/Nov/27 14:20:45.624609 TESTCASE ../src/MQTT_TestCases.ttcn:36(testcase:TC_MQTT_BROKER_CONNECT_001) Test case TC_MQTT_BROKER_CONNECT_001 finished. Verdict: pass reason: IUT closed the Network Connection correctly',
      logType: 'tty',
      expected: {testcase: 'TC_MQTT_BROKER_CONNECT_001', verdict: 'pass', reason: 'IUT closed the Network Connection correctly'}
    }, {
      line: '2018/Nov/27 14:20:45.624609 TESTCASE ../src/MQTT_TestCases.ttcn:36(testcase:TC_MQTT_BROKER_CONNECT_001) Test case TC_MQTT_BROKER_CONNECT_001 finished. Verdict: pass reason: IUT closed the Network Connection correctly',
      logType: 'log',
      expected: {testcase: 'TC_MQTT_BROKER_CONNECT_001', verdict: 'pass', reason: 'IUT closed the Network Connection correctly'}
    }, {
      line: '2018/Nov/27 15:23:40.010457 TESTCASE ../src/CoAP_Testcases.ttcn:30(testcase:TC_COAP_SERVER_HEADER_001) Test case TC_COAP_SERVER_HEADER_001 finished. Verdict: pass',
      logType: 'log',
      expected: {testcase: 'TC_COAP_SERVER_HEADER_001', verdict: 'pass', reason: 'no reason'}
    }, {
      line: '2018/Nov/27 15:23:40.010457 TESTCASE ../src/CoAP_Testcases.ttcn:30(testcase:TC_COAP_SERVER_HEADER_001) Test case TC_COAP_SERVER_HEADER_001 finished. Verdict: pass',
      logType: 'tty',
      expected: {testcase: 'TC_COAP_SERVER_HEADER_001', verdict: 'pass', reason: 'no reason'}
    }, {
      line: 'MTC@lxndr: Dynamic test case error: Test case TC_MQTT_BROKER_SUBSCRIBE_002 does not exist in module MQTT_TestCases. (Transport endpoint is not connected)',
      logType: 'tty',
      expected: {testcase: 'TC_MQTT_BROKER_SUBSCRIBE_002', verdict: 'error', reason: 'does not exist in module MQTT_TestCases. (Transport endpoint is not connected)'}
    }, {
      line: 'Dynamic test case error: Test case TC_MQTT_BROKER_SUBSCRIBE_003 does not exist in module MQTT_TestCases.',
      logType: 'tty',
      expected: {testcase: 'TC_MQTT_BROKER_SUBSCRIBE_003', verdict: 'error', reason: 'does not exist in module MQTT_TestCases.'}
    }, {
      line: 'TESTCASE ../src/CoAP_Testcases.ttcn:30(testcase:TC_COAP_SERVER_HEADER_001) Test case TC_COAP_SERVER_HEADER_001 finished. Verd_XXX_ict: pass',  // malformed 'Verdict:'
      logType: 'tty',
      expected: undefined
    }, {
      line: 'TESTCASE ../src/CoAP_Testcases.ttcn:30(testcase:TC_COAP_SERVER_HEADER_001) Test_XXX_case TC_COAP_SERVER_HEADER_001 finished. Verdict: pass',  // malformed 'Test case'
      logType: 'tty',
      expected: undefined
    }, {
      line: 'TESTCASE ../src/CoAP_Testcases.ttcn:30(test_XXX_case:TC_COAP_SERVER_HEADER_001) Test case TC_COAP_SERVER_HEADER_001 finished. Verdict: pass',  // malformed 'testcase:'
      logType: 'log',
      expected: undefined
    }, {
      line: 'TESTCASE ../src/CoAP_Testcases.ttcn:33(testcase:TC_COAP_SERVER_HEADER_002) Test case TC_COAP_SERVER_HEADER_002 started.',
      logType: 'tty',
      expected: undefined
    }, {
      line: 'xxxxxx',
      logType: 'xxxx',
      expected: undefined
    }, {
      line: 'Test case TC_MQTT_BROKER_CONNECT_017 started.',
      logType: 'tty',
      expected: undefined
    }
  ]

  tests.forEach((test) => {
    it('TC: single line ' + test.line, () => {
      const response = lineChecker.readAndCheckLine(test.line, test.logType)
      const expected = test.expected

      if (expected) {
        assert.equal(response.testcase, expected.testcase)
        assert.equal(response.verdict, expected.verdict)
        assert.equal(response.reason, expected.reason)

        // check if delivered timestamp is valid and compare to the parsed output of a invalid timestamp
        assert.notEqual(new Date(response.timestamp).toLocaleString(), new Date('invalid format').toLocaleString())
      } else {
        assert.strictEqual(response, expected)
      }
    })
  })
})
