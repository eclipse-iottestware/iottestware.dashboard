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
import update from 'immutability-helper'
import {Growl} from 'primereact/growl'

import HostInput from './inputs/HostInput'
import PortInput from './inputs/PortInput'
import TimerValueInput from './inputs/TimerValueInput'
import TestCaseSelect from './inputs/TestCaseSelect'
import {TriStateCheckbox} from 'primereact/tristatecheckbox'
import 'babel-polyfill'
import { Dropdown } from 'primereact/dropdown'

export default class MQTTClientTestingConf extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      interfaces: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleTimerValueChange = this.handleTimerValueChange.bind(this)
    this.onTimeoutVerdictChange = this.onTimeoutVerdictChange.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.onInterfaceChange = this.onInterfaceChange.bind(this)
  }

  componentDidMount () {
    fetch('/v1/tools/ifconfig')
      .then(response => response.json())
      .then(data => {
        const interfaces = []
        Object.keys(data).forEach((item) => {
          // TODO: do the filtering in the backend
          // TODO: similar code in NetworkInterfaces.js
          if (data[item].length > 0) {
            data[item].forEach((ifItem) => {
              if (ifItem.family === 'IPv4') {
                interfaces.push({name: item, address: ifItem.address, netmask: ifItem.netmask})
              }
            })
          }
        })
        return interfaces
      }).then(ifItems => {
        this.setState(update(this.state, { 'interfaces': {$set: ifItems} }))
      })
  }

  handleChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.id

    const newInputState = update(this.props.state, {
      [name]: {$set: value}
    })

    this.props.onChange(newInputState)
  }

  handleSelectionChange (selection) {
    const newInputState = update(this.props.state, {testcases: {$set: selection}})
    this.props.onChange(newInputState)
  }

  onInterfaceChange (e) {
    const newInputState = update(this.props.state, {tsInterface: {$set: e.value}})
    this.props.onChange(newInputState)
  }

  handleTimerValueChange (e, id) {
    const newInputState = update(this.props.state, {
      [id]: {$set: e.value}
    })
    this.props.onChange(newInputState)
  }

  onTimeoutVerdictChange (e) {
    const newInputState = update(this.props.state, {
      timeoutVerdict: {$set: e.value}
    })
    this.props.onChange(newInputState)
  }

  render () {
    const verdictTimeoutTuple = this.props.timeoutVerdictTuple()
    let verdictTimeoutHead
    if (verdictTimeoutTuple.verdictOnTimeout === false) {
      verdictTimeoutHead = <h4>No verdict on Timeout!</h4>
    } else {
      const verdictStyle = verdictTimeoutTuple.verdictValue === 'inconc' ? 'verdict-inconc' : 'verdict-fail'
      verdictTimeoutHead = <h4>On Timeout set verdict to <span className={verdictStyle}>{verdictTimeoutTuple.verdictValue}</span></h4>
    }

    return (
      <div>
        <Growl ref={(el) => this.growl = el} />
        <h3 className='first'>Test System</h3>
        <div className='p-grid p-fluid'>
          <Dropdown id='ifSelector' value={this.props.state.tsInterface}
            options={this.state.interfaces}
            onChange={this.onInterfaceChange}
            style={{width: '200px'}} placeholder='Select Interface' optionLabel='name' />
        </div>
        <h3 className='first'>Upper Tester</h3>
        <div className='p-grid p-fluid'>
          <HostInput handleChange={this.handleChange} value={this.props.state.host} defaultValue='iot.eclipse.org' />
          <PortInput handleChange={this.handleChange} value={this.props.state.port} defaultValue={1884} />
        </div>
        <h3 className='first'>Timeouts and Timeout Behaviors</h3>
        <div className='p-grid p-fluid'>
          <TimerValueInput handleChange={this.handleTimerValueChange} tooltip={'keep alive value'} value={this.props.state.keepAliveTimer} defaultValue={5.0} id={'keepAliveTimer'} />
          <TimerValueInput handleChange={this.handleTimerValueChange} tooltip={'max. duration of a single test case'} value={this.props.state.maxTestCaseTimer} defaultValue={10.0} id={'maxTestCaseTimer'} />
          {verdictTimeoutHead}
          <TriStateCheckbox value={this.props.state.timeoutVerdict} onChange={this.onTimeoutVerdictChange} tooltip='How to handle timeouts' />
        </div>
        <h3 className='first'>Test Case Selection</h3>
        <div className='p-grid p-fluid'>
          <div className='p-col-12 p-md-12'>
            <TestCaseSelect handleSelectionChange={this.handleSelectionChange} protocol={'mqtt'} sut={'client'} />
          </div>
        </div>
      </div>
    )
  }
}
