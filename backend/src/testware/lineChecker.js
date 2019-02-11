/********************************************************************************
 * Copyright (c) 2019 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 4
 ********************************************************************************/

// function to filter testcases, verdicts and reasons out auf String 'line'
// TODO: split into multiple smaller functions
function readAndCheckLine (line, logfileType) {
  const regexVerdict = /Verdict:\s(.*)/
  const regexDynamicError = /Dynamic test case error:\s(.*)/
  let regexTestcase

  switch (logfileType.toUpperCase()) {
    case 'LOG':
      regexTestcase = /\(testcase:(.*)(?=\))/
      break

    case 'TTY':
      regexTestcase = /Test case\s(.*)(?=\sfinished)/
      break

    default:
      return
  }

  if (regexVerdict.test(line)) {
    if (line.match(regexTestcase) && line.match(regexVerdict)) {
      const testcaseName = line.match(regexTestcase)[1] // first parameter is first match on (.*) in regex, everything after "(testcase: " and without closing bracket ")"
      const verdictAndReason = line.match(regexVerdict)[1] // first parameter is first match on (.*) in regex, everything after "Verdict: "
      let verdict
      let reason

      // if only verdict and no reason is given
      if (/\sreason.*/.test(verdictAndReason)) {
        verdict = verdictAndReason.match(/(.*)(?=\sreason.*)/)[1] // everthing before " reason....."
        reason = verdictAndReason.match(/.*reason:\s(.*)/)[1] // everything after "reason: "
      } else {
        verdict = verdictAndReason
        reason = 'no reason'
      }

      const testResult = {
        'timestamp': new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        'testcase': testcaseName,
        'verdict': verdict,
        'reason': reason
      }
      return testResult
    }
  } else if (regexDynamicError.test(line)) {
    regexTestcase = /Test case\s(.*)/
    if (line.match(regexTestcase)) {
      const testcaseAndReason = line.match(regexTestcase)[1] // everything after 'Test case' into tokens split by ' '
      const testcaseName = testcaseAndReason.split(' ')[0]                         // first element is the name of the test case
      const reason = testcaseAndReason.match(/\w\s(.*)/)[1]

      const testResult = {
        'timestamp': new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        'testcase': testcaseName,
        'verdict': 'error',
        'reason': reason
      }
      return testResult
    }
  }
}

exports.readAndCheckLine = readAndCheckLine
