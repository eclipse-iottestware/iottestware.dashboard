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
'use strict'

class TestResultTable {
  constructor (result, purpose) {
    this.result = result    // test result
    this.purpose = purpose  // test purpose
  }

  render () {
    const verdict = this.result.verdict
    const reason = this.result.reason
    const testcase = this.result.testcase
    const timestamp = this.result.timestamp

    const renderedTable =
      {
        table: {
          dontBreakRows: true,
          body: [
            ['TP ID', this.purpose.id],
            ['Test Objective', this.purpose.objective],
            ['Reference', this.purpose.reference],
            ['PICS Selection', this.purpose.PICS.map(p => p)],
            [{text: 'Initial Conditions', colSpan: 2, alignment: 'center'}],
            [{text: this.purpose.init, colSpan: 2}],
            [{text: 'Expected Behaviour', colSpan: 2, alignment: 'center'}],
            [{text: this.purpose.expected, colSpan: 2}],
            [{text: 'Test Result', colSpan: 2, alignment: 'center'}],
            ['TC ID', testcase],
            ['Date', timestamp],
            [{
              text: verdict,
              fillColor: verdictColor(verdict)
            }, reason]
          ]
        },
        layout: {
          fillColor: function (i, node) {
            return (i >= 4 && i <= 9 && i % 2 === 0) ? '#CCCCCC' : null
          }
        },
        style: 'test_result_table'
      }

    return renderedTable
  }
}

const verdictColor = (verdict) => {
  switch (verdict) {
    case 'pass': return '#00CC00'
    case 'fail': return '#FF0000'
    case 'inconc': return '#FFFF00'
    case 'none': return '#FFBBBB'
    default: return null
  }
}

module.exports = TestResultTable
