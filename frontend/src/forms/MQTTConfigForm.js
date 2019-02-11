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
import { Button } from 'primereact/button'
import {Growl} from 'primereact/growl'

import HostInput from './inputs/HostInput'
import PortInput from './inputs/PortInput'
import UsernameInput from './inputs/UsernameInput'
import IdentifierInput from './inputs/IdentifierInput'
import MqttTopicInput from './inputs/MqttTopicInput'
import PasswordInput from './inputs/PasswordInput'
import TestCaseSelect from './inputs/TestCaseSelect'
import 'babel-polyfill'
import { testsuiteConfigURI, testsuiteRunURI } from '../utils/BackendEndpoints'

import { withRouter } from 'react-router-dom'

class MQTTConfigForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      host: 'iot.eclipse.org',
      port: '1883',
      topic: 'eclipse/iot/tesware/0',
      password: 'strong_password',
      username: 'IoT-Testware',
      clientid: '123-456-789',
      testcases: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
  }

  handleSelectionChange (selection) {
    this.setState(update(this.state, {testcases: {$set: selection}}))
  }

  handleChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.id

    const newInputState = update(this.state, {
      [name]: {$set: value}
    })

    this.setState(newInputState)
  }

  handleSubmit (event) {
    // prevent the default behaviour of <form> which would reload the whole page
    event.preventDefault()

    const jsonRequest = JSON.stringify(this.state)

    fetch(testsuiteConfigURI('mqtt'), {
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
      // payload.config contains the name of the configuration file!
      const timestamp = payload.timestamp
      fetch(testsuiteRunURI('mqtt', timestamp), {method: 'GET'})
        .then(async runResponse => {
          if (runResponse.status !== 200) {
            const errorMessage = await runResponse.json()
            throw errorMessage
          }
          return runResponse.json()
        })
        .then(payload => {
          // show /testresults/mqtt // TODO: get ID from payload and show /testresults/mqtt/ID
          this.props.history.push('/testresults/mqtt')
        })
        .catch(error => {
          // this error is thrown if Titan/TestSuite is not installed properly
          this.growl.show({severity: 'error', summary: 'Missing Titan/TestSuite', detail: error.reason})
        })
    }).catch(error => {
      this.growl.show({severity: 'error', summary: 'Incorrect Input', detail: error.reason})
    })
  }

  render () {
    return (
      <div className='form'>
        <form onSubmit={event => { this.handleSubmit(event) }}>
          <h3 className='first'>Host</h3>
          <div className='ui-g ui-fluid'>
            <Growl ref={(el) => this.growl = el} />
            <HostInput handleChange={this.handleChange} value={this.state.host} defaultValue='iot.eclipse.org' />
            <PortInput handleChange={this.handleChange} value={this.state.port} defaultValue={1883} />
          </div>
          <h3 className='first'>PIXIT</h3>
          <div className='ui-g ui-fluid'>
            <UsernameInput handleChange={this.handleChange} value={this.state.username} defaultValue={'IoT-Testware'} />
            <PasswordInput masked={false} handleChange={this.handleChange} value={this.state.password} />
            <IdentifierInput
              handleChange={this.handleChange}
              value={this.state.clientid}
              placeholder='Client ID'
              id='clientid' />
            <MqttTopicInput handleChange={this.handleChange} value={this.state.topic} />
          </div>
          <h3 className='first'>Test cases</h3>
          <div className='ui-g ui-fluid'>
            <div className='ui-g-12 ui-md-12'>
              <TestCaseSelect handleSelectionChange={this.handleSelectionChange} protocol={'mqtt'} />
            </div>
          </div>
          <div className='ui-g ui-fluid'>
            <div className='ui-g-12 ui-md-2'>
              <Button icon='fa fa-play' label='Run' type='submit' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(MQTTConfigForm)
