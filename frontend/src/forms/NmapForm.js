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
import {Button} from 'primereact/button'
import {Dropdown} from 'primereact/dropdown'
import {Growl} from 'primereact/growl'
import HostInput from './inputs/HostInput'
import {InputSwitch} from 'primereact/inputswitch'
import update from 'immutability-helper'

const scanProfiles = [
  {label: 'Regular scan', value: 'regular_scan'},
  {label: 'Ping scan', value: 'ping_scan'},
  {label: 'Quick scan', value: 'quick_scan'},
  {label: 'Quick scan, all TCP ports', value: 'quick_scan_plus'},
  {label: 'Quick scan IoT', value: 'quick_scan_iot'},
  // Quick Scan+ requires root privileges
  // {label: 'Quick scan+', value: 'quick_scan_plus'},
  // {label: 'Quick traceroute', value: 'quick_traceroute'},
  {label: 'Intense scan', value: 'intense_scan'},
  // {label: 'Intense scan + UDP', value: 'intense_scan_udp'},
  {label: 'Intense scan, all TCP ports', value: 'intense_scan_all_tcp'},
  {label: 'Intense scan, no ping', value: 'intense_scan_no_ping'}
]

export default class NmapForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isReady: true,
      target: 'gateway.local',
      scanProfile: 'quick_scan',
      skipHostDiscovery: false
    }

    this.handleTargetChange = this.handleTargetChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onScanProfileChange = this.onScanProfileChange.bind(this)
  }

  handleSubmit (event) {
    const jsonRequest = JSON.stringify(this.state)

    fetch('/v1/tools/nmap/scan', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonRequest
    }).then(async response => {
      if (response.status !== 200) {
        const errorMessage = await response.json()
        throw errorMessage
      }

      return response.json()
    }).then(payload => {
      this.props.nextViewState(payload.reason)
    }).catch(error => {
      this.growl.show({severity: 'error', summary: 'Incorrect Input', detail: error.message})
    })

    // prevent the default behaviour of <form> which would reload the whole page
    event.preventDefault()
  }

  handleTargetChange (e) {
    let target = e.target.value
    this.setState({target: target})
  }

  onScanProfileChange (e) {
    this.setState({scanProfile: e.value})
  }

  render () {
    return (
      <div className='p-grid, p-fluid'>
        <Growl ref={(el) => this.growl = el} />
        <form onSubmit={event => { this.handleSubmit(event) }}>
          <div className='p-grid p-fluid'>
            <h3>Scan Target</h3>
            <div className='p-col-6'>
              <HostInput handleChange={this.handleTargetChange} value={this.state.target} />
            </div>
            <h3>Scan Profile</h3>
            <div className='p-col-12 p-md-4'>
              <Dropdown value={this.state.scanProfile} options={scanProfiles} onChange={(e) => { this.setState({scanProfile: e.value}) }} placeholder='Select a Scan Profile' />
            </div>
            <h3>Skip Host Discovery</h3>
            <div className='p-col-12 p-md-4'>
              <InputSwitch checked={this.state.skipHostDiscovery} onChange={(e) => this.setState({skipHostDiscovery: e.value})} tooltip='-Pn' />
            </div>
          </div>
          <hr />
          <div className='p-col-12 p-md-4'>
            <Button icon='fa fa-play' label='Scan' type='submit' disabled={!this.state.isReady} />
          </div>
        </form>
      </div>
    )
  }
}
