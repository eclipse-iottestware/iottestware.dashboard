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
import React from 'react'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/components/column/Column'
import {InputSwitch} from 'primereact/inputswitch'
import update from 'immutability-helper'
import {testPurpose} from './TestPurpose'

import io from 'socket.io-client'
import { loadTestPurposes } from '../loaders/TestPurposesLoader'
import { Growl } from 'primereact/growl'

export default class TestResults extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      expandAll: false,
      expandedRows: [],
      testPurposes: {},
      testResults: [],
      isRunning: true
    }

    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this)
    this.onExpandAll = this.onExpandAll.bind(this)
    this.dataCallback = this.dataCallback.bind(this)
    this.runningState = this.runningState.bind(this)
  }

  componentDidMount () {
    const protocol = this.props.protocol

    const that = this
    this.socket = io('/')
    this.socket.on('testresults', function (newData) {
      that.setState({
        testResults: that.state.testResults.concat(newData)
      })
    })

    this.socket.on('testresults/finish', () => {
      this.setState(update(this.state, {isRunning: {$set: false}}))

      this.growl.show({severity: 'success', summary: 'Finished', detail: 'Test Run finished'})
    })

    loadTestPurposes(protocol, this.dataCallback)
  }

  componentWillUnmount () {
    this.socket.close()
  }

  onExpandAll (event, allRows) {
    // toggle expandAll flag and expandedRow
    this.setState(update(this.state, {
      expandAll: {$set: event.value},
      expandedRows: {$set: (event.value) ? allRows : []}
    }))
  }

  verdictTemplate (rowData, column) {
    const verdict = rowData.verdict
    let verdictClass = 'verdict-none'

    if (verdict === 'pass') {
      verdictClass = 'verdict-pass'
    } else if (verdict === 'inconc') {
      verdictClass = 'verdict-inconc'
    } else if (verdict === 'fail') {
      verdictClass = 'verdict-fail'
    } else if (verdict === 'error') {
      verdictClass = 'verdict-error'
    } else if (verdict === 'none') {
      verdictClass = 'verdict-none'
    }

    return (<div className={verdictClass}>{verdict}</div>)
  }

  /**
   * This method will be called after TestPurposeLoader received data or error
   * @param data
   * @param err
   */
  dataCallback (data, err) {
    if (err) {
      this.growl.show({severity: 'error', summary: 'Failure', detail: err.message})
    }

    this.setState(update(this.state, {testPurposes: {$set: data}}))
  }

  rowExpansionTemplate (data) {
    const tpID = data.testcase.replace('TC_', 'TP_').toUpperCase()
    let tp = this.state.testPurposes[tpID]

    // in case tp could not be found!
    let renderedTP = null
    if (!tp) {
      renderedTP = (
        <div className='ui-g ui-fluid'>
          <div className='ui-g-12 ui-md-12' style={{'text-align': 'center'}}>
            <i className='pi pi-exclamation-triangle' style={{'fontSize': '3em'}} />
            <p>Testcase {data.testcase} could not be mapped to a Testpurpose</p>
          </div>
        </div>
      )
    } else {
      renderedTP = testPurpose(tp, data.timestamp)
    }

    return (
      <div className='ui-g ui-fluid'>
        <div className='ui-g-12 ui-md-12'>
          {
            renderedTP
          }

        </div>
      </div>
    )
  }

  runningState () {
    if (this.props.runningState) {
      if (this.state.isRunning) {
        return (
          <i className='pi pi-spin pi-spinner' style={{'fontSize': '3em'}} />
        )
      } else {
        return (
          <i className='pi pi-circle-on' style={{'fontSize': '3em'}} />
        )
      }
    }
  }

  render () {
    let allResultsRows = []

    if (this.props.testResults === undefined) {
      // Note: this will block test results coming from socket.io
      this.state.testResults.forEach((result) => {
        allResultsRows.push(result)
      })
    } else {
      this.props.testResults.forEach((result, index) => {
        allResultsRows.push(result)
      })
    }

    return (
      <div className='test-results'>
        <Growl ref={(el) => this.growl = el} />
        <div className='ui-g ui-fluid'>

          <div className='ui-g-12 ui-md-6'>
            <div className='ui-g'>
              <label>Expand all</label>
              <InputSwitch checked={this.state.expandAll} onChange={e => this.onExpandAll(e, allResultsRows)} />
            </div>
          </div>

          <div className='ui-g-12 ui-md-6'>
            <div className='ui-g'>
              {
                this.runningState()
              }
            </div>
          </div>
        </div>

        <DataTable value={allResultsRows} expandedRows={this.state.expandedRows}
          onRowToggle={(e) => this.setState(update(this.state, {expandedRows: {$set: e.data}}))}
          rowExpansionTemplate={this.rowExpansionTemplate}
          lazy loading={this.state.loading}>
          <Column expander style={{width: '2em'}} header={<i className={'fa fa-hashtag'} />} />
          <Column field='testcase' header='Test Case' />
          <Column field='verdict' header='Verdict' body={this.verdictTemplate} style={{width: 60}} />
          <Column field='reason' header='Reason' />
        </DataTable>
      </div>
    )
  }
}
