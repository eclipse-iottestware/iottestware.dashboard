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

class MQTTBrokerTestingConf extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleClientChange = this.handleClientChange.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
  }

  handleSelectionChange (selection) {
    const newInputState = update(this.props.state, {testcases: {$set: selection}})
    this.props.onChange(newInputState)
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

  handleClientChange (event, clientIdx) {
    const target = event.target
    const value = target.value
    const name = target.id

    const newInputState = update(this.props.state, {
      clients: {
        [clientIdx]: {
          [name]: {$set: value}
        }
      }
    })

    this.props.onChange(newInputState)
  }


  render () {
    return (
      <div>
        <h3 className='first'>Host</h3>
        <div className='p-grid p-fluid'>
          <HostInput handleChange={this.handleChange} value={this.props.state.host} defaultValue='iot.eclipse.org' />
          <PortInput handleChange={this.handleChange} value={this.props.state.port} defaultValue={1883} />
        </div>
        <h3 className='first'>Clients</h3>
        <h4>Client 1</h4>
        <div className='p-grid p-fluid'>
          <UsernameInput handleChange={e => this.handleClientChange(e, 0)} value={this.props.state.clients[0].username} defaultValue={'Client_1'} />
          <PasswordInput masked={false} handleChange={e => this.handleClientChange(e, 0)} value={this.props.state.clients[0].password} />
          <IdentifierInput
            handleChange={e => this.handleClientChange(e, 0)}
            value={this.props.state.clients[0].clientid}
            placeholder='Client ID' />
        </div>
        <h4>Client 2</h4>
        <div className='p-grid p-fluid'>
          <UsernameInput handleChange={e => this.handleClientChange(e, 1)} value={this.props.state.clients[1].username} defaultValue={'Client_2'} />
          <PasswordInput masked={false} handleChange={e => this.handleClientChange(e, 1)} value={this.props.state.clients[1].password} />
          <IdentifierInput
            handleChange={e => this.handleClientChange(e, 1)}
            value={this.props.state.clients[1].clientid}
            placeholder='Client ID' />
        </div>
        <h3 className='first'>Topics</h3>
        <div className='p-grid p-fluid'>
          <MqttTopicInput handleChange={this.handleChange} value={this.props.state.topic} />
        </div>
        <h3 className='first'>Test Case Selection</h3>
        <div className='p-grid p-fluid'>
          <div className='p-col-12 p-md-12'>
            <TestCaseSelect handleSelectionChange={this.handleSelectionChange} protocol={'mqtt'} sut={'broker'} />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MQTTBrokerTestingConf)
