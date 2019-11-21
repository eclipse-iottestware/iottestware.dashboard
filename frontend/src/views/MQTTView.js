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
import MQTTBrokerTestingConf from '../forms/MQTTBrokerTestingConf'
import SUTChoice from '../forms/inputs/SUTChoice'
import { Button } from 'primereact/button'
import MQTTClientTestingConf from '../forms/MQTTClientTestingConf'

import { Steps } from 'primereact/steps'
import {InputTextarea} from 'primereact/inputtextarea'
import { testsuiteConfigURI, testsuiteRunURI } from '../utils/BackendEndpoints'
import 'babel-polyfill'
import { Growl } from 'primereact/growl'
import TestResults from '../components/TestResultsComponent'

const items = [
  { label: 'Select SUT' },
  { label: 'Configuration' },
  { label: 'Preview' },
  { label: 'Test Run' }
]

const options = [
  {label: 'Broker Testing', value: 'conf_01'},
  {label: 'Client Testing', value: 'conf_03'}
]

export default class MQTTView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      configuration: 'conf_01',
      step: 0,
      sutConfiguration: null,
      configurationId: null,
      clientTesting: {
        tsInterface: 'lo',  // interface on which the Test System will listen
        host: '127.0.0.1',  // upper tester
        port: '1884',       // upper tester
        keepAliveTimer: 5.0,
        maxTestCaseTimer: 10.0,
        timeoutVerdict: true,
        testcases: []
      },
      brokerTesting: {
        host: 'iot.eclipse.org',
        port: '1883',
        topic: 'eclipse/iot/tesware/0',
        clients: [
          {
            clientid: '123-456-789',
            username: 'IoTester_1',
            password: 'strong_password'
          },
          {
            clientid: '987-654-321',
            username: 'IoTester_2',
            password: 'strong_password'
          }
        ],
        testcases: []
      }
    }

    this.onSUTChoice = this.onSUTChoice.bind(this)
    this.onButtonNext = this.onButtonNext.bind(this)
    this.onButtonPrevious = this.onButtonPrevious.bind(this)
    this.onClientConfigChange = this.onClientConfigChange.bind(this)
    this.onBrokerConfigChange = this.onBrokerConfigChange.bind(this)
    this.timeoutVerdictTuple = this.timeoutVerdictTuple.bind(this)
  }

  timeoutVerdictTuple () {
    if (this.state.clientTesting.timeoutVerdict === null) {
      return {verdictOnTimeout: false, verdictValue: 'pass'}
    } else if (this.state.clientTesting.timeoutVerdict) {
      return {verdictOnTimeout: true, verdictValue: 'inconc'}
    } else {
      return {verdictOnTimeout: true, verdictValue: 'fail'}
    }
  }

  onClientConfigChange (clientConfig) {
    const newInputState = update(this.state, {
      'clientTesting': {$set: clientConfig}
    })
    this.setState(newInputState)
  }

  onBrokerConfigChange (brokerConfig) {
    const newInputState = update(this.state, {
      'brokerTesting': {$set: brokerConfig}
    })
    this.setState(newInputState)
  }

  onSUTChoice (e) {
    const value = e.value

    if (value) {
      this.setState(update(this.state, {configuration: {$set: value}}))
    }
  }

  renderButtons () {
    // enable/disable prev and next button if reached an end
    let prev = (this.state.step > 0 && this.state.step < items.length - 1)
    let next = (this.state.step < items.length - 1)

    let prevButton
    if (prev) {
      const label = items[this.state.step - 1].label
      prevButton = (
        <div className='p-col' style={{float: 'left'}}>
          <Button label={label} onClick={this.onButtonPrevious} />
        </div>
      )
    }

    let nextButton
    if (next) {
      const label = items[this.state.step + 1].label
      nextButton = (
        <div className='p-col' style={{float: 'right'}}>
          <Button label={label} onClick={this.onButtonNext} />
        </div>
      )
    }

    return (
      <div className='p-grid'>
        {prevButton}
        {nextButton}
        <br />
      </div>
    )
  }

  onButtonNext (e) {
    const step = this.state.step + 1
    if (step < items.length) {
      this.setState(update(this.state, {step: {$set: step}}))

      // if reached Preview step, send the configuration to backend and fetch a Preview
      if (items[step].label === 'Preview') { this.fetchConfigurationPreview() }

      // if reached Test Run (last) step, first trigger to start a test suite
      if (step === items.length - 1) { this.startTestSuite() }
    }
  }

  onButtonPrevious (e) {
    const step = this.state.step - 1

    // if moved back from preview, delete last preview
    if (this.state.step === items.length - 1) {
      this.setState(update(this.state, {sutConfiguration: {$set: null}}))
    }

    if (step >= 0) {
      this.setState(update(this.state, {step: {$set: step}}))
    }
  }

  fetchConfigurationPreview () {
    let jsonRequest
    let sut
    if (this.state.configuration === 'conf_01') {
      sut = 'broker'
      jsonRequest = JSON.stringify(this.state.brokerTesting)
    } else if (this.state.configuration === 'conf_03') {
      sut = 'client'
      jsonRequest = JSON.stringify(this.state.clientTesting)
    }

    fetch(testsuiteConfigURI('mqtt', sut), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonRequest
    }).then(async response => {
      if (response.status !== 200) {
        throw await response.json()
      }
      return response.json()
    }).then(response => {
      const configuration = response.configuration
      const ts = response.timestamp
      this.setState(update(this.state, {'sutConfiguration': {$set: configuration}}))
      this.setState(update(this.state, {'configurationId': {$set: ts}}))
    }).catch(error => {
      this.growl.show({severity: 'error', summary: 'ERROR', detail: error.reason})
    })
  }

  startTestSuite () {
    const ts = this.state.configurationId

    fetch(testsuiteRunURI('mqtt', ts), {method: 'GET'})
      .then(async runResponse => {
        if (runResponse.status !== 200) {
          const errorMessage = await runResponse.json()
          throw errorMessage
        }
      })
      .catch(error => {
        // this error is thrown if Titan/TestSuite is not installed properly
        this.growl.show({severity: 'error', summary: 'Missing Titan/TestSuite', detail: error.reason})

        // press the invisible 'Back' button two times in 2 seconds -> go back to configuration
        setTimeout(() => {
          this.onButtonPrevious()
          this.onButtonPrevious()
        }, 2000)
      })
  }

  renderState () {
    let stateRendered
    if (this.state.step === 0) {
      stateRendered = (
        <div align={'center'}>
          <h2>Choose the System Under Test</h2>
          <SUTChoice value={this.state.configuration} options={options} onChange={this.onSUTChoice} />
        </div>
      )
    } else if (this.state.step === 1) {
      if (this.state.configuration === 'conf_01') {
        stateRendered = (
          <div>
            <div align={'center'}>
              <h2>MQTT Broker Testing Configuration</h2>
            </div>
            <MQTTBrokerTestingConf state={this.state.brokerTesting} onChange={this.onBrokerConfigChange} />
          </div>
        )
      } else if (this.state.configuration === 'conf_03') {
        stateRendered = (
          <div>
            <div align={'center'}>
              <h2>MQTT Client Testing Configuration</h2>
            </div>
            <MQTTClientTestingConf state={this.state.clientTesting} onChange={this.onClientConfigChange} timeoutVerdictTuple={this.timeoutVerdictTuple} />
          </div>
        )
      }
    } else if (this.state.step === 2) {
      stateRendered = (
        <div align={'center'}>
          <h2>Configuration Preview</h2>
          <InputTextarea rows={5} cols={80} value={this.state.sutConfiguration} autoResize />
        </div>
      )
    } else if (this.state.step === 3) {
      stateRendered = (
        <div>
          <TestResults protocol={'mqtt'} runningState />
        </div>
      )
    }
    return stateRendered
  }

  render () {
    const crumb = this.renderState()
    const headLine = () => {
      if (this.state.step === 1) {
        const conf = options.find(e => e.value === this.state.configuration)
        return 'MQTT Conformance: ' + conf.label
      } else {
        return 'MQTT Conformance Test Suite'
      }
    }
    return (
      <div>
        <Growl ref={(el) => this.growl = el} />
        <div className='content-section section-header section-header-small'>
          <h1>{headLine()}</h1>
        </div>

        <div className='content-section section-content'>
          <Steps model={items} activeIndex={this.state.step} />
          <br />
          {crumb}
          <br />
          {this.renderButtons()}
        </div>
      </div>
    )
  }
}
