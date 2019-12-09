const assert = require('assert')
const fs = require('fs')
const path = require('path')

const nmapParser = require('../../../backend/src/nmap/nmapParser')

const resourcePath = './test/backend/nmap'

const tests = [
  {
    output: path.join(resourcePath, 'quick_scan_01.txt'),
    result: {'hosts': [{'host': '10.10.64.61', 'ports': [], 'latency': '0.00018'}], 'nmap': '7.70', 'start': '2019-12-09 11:19 CET', 'scanned': '1', 'up': '1', 'duration': '8.12'}
  },
  {
    output: path.join(resourcePath, 'quick_scan_02.txt'),
    result: {'hosts': [
      {'host': '10.10.64.61', 'ports': [{'port': '8080', 'transport': 'tcp', 'state': 'open', 'service': 'http-proxy'}], 'latency': '0.00021'},
        {'host': '10.10.64.62', 'ports': [{'port': '53', 'transport': 'tcp', 'state': 'open', 'service': 'domain?', 'version': 'CUPS 2.3'}, {'port': '631', 'transport': 'tcp', 'state': 'open', 'service': 'ipp', 'version': 'CUPS 2.3'}], 'latency': '0.0099'},
        {'host': '10.10.64.63', 'ports': [], 'latency': '0.018'}],
      'nmap': '7.70',
      'start': '2019-12-09 12:05 CET',
      'scanned': '4',
      'up': '3',
      'duration': '156.77'}
  }
]

describe('Test the QuickScan by providing the whole output at once', () => {
  tests.forEach((test) => {
    it('batch test', () => {
      const output = fs.readFileSync(test.output, 'utf-8')
      let [ready, report] = nmapParser.parse(output, null)

      if (ready) {
        assert.equal(report.start, test.result.start, 'Start time is wrong')
        assert.equal(report.duration, test.result.duration, 'Scan duration is wrong')
        assert.equal(report.hosts.length, test.result.hosts.length, 'Length of captured targets is wrong')
        report.hosts.forEach((t, i) => {
          assert.equal(t.ports.length, test.result.hosts[i].ports.length, 'Did not capture all open ports ' + JSON.stringify(t))
        })
      } else {
        assert.fail('Parser did not catch the end of scan')
      }
    })
  })
})

describe('Test the QuickScan by providing the whole output line by line', () => {
  tests.forEach((test) => {
    it('line by line test', () => {
      const output = fs.readFileSync(test.output, 'utf-8')

      let ready, report
      // split lines and provide line by line as if parsing live incoming
      output.split(/\r?\n/).forEach(line => {
        [ready, report] = nmapParser.parse(line, report)
      })

      if (ready) {
        assert.equal(report.start, test.result.start, 'Start time is wrong')
        assert.equal(report.duration, test.result.duration, 'Scan duration is wrong')
        assert.equal(report.hosts.length, test.result.hosts.length, 'Length of captured targets is wrong')
        report.hosts.forEach((t, i) => {
          assert.equal(t.ports.length, test.result.hosts[i].ports.length, 'Did not capture all open ports')
        })
      } else {
        assert.fail('Parser did not catch the end of scan')
      }
    })
  })
})
