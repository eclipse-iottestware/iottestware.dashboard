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
import {Chart} from 'primereact/chart'
import { Growl } from 'primereact/growl'
import {TabView, TabPanel} from 'primereact/tabview'
import TestResults from './TestResultsComponent'
import {evaluationURI} from '../utils/BackendEndpoints'

export default class EvaluationChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      protocol: null,
      statistics: {
        sumTestCases: 0
      },
      testresults: [],
      chart_data: {
        labels: [],
        datasets: [
          {
            label: 'PASS',
            backgroundColor: '#009900',
            borderColor: '#005500',
            data: []
          },
          {
            label: 'INCONCLUSIVE',
            backgroundColor: '#999900',
            borderColor: '#555500',
            data: []
          }, {
            label: 'FAIL',
            backgroundColor: '#990000',
            borderColor: '#550000',
            data: []
          }
        ]
      }
    }

    this.loadEvaluation = this.loadEvaluation.bind(this)
  }

  componentDidMount () {
    const protocol = this.props.protocol

    this.setState(update(this.state, {protocol: {$set: protocol}}))
  }

  componentWillReceiveProps (nextProps) {
    const protocol = nextProps.protocol

    if (protocol !== this.state.protocol) {
      this.setState(update(this.state, {protocol: {$set: protocol}}))
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.protocol !== this.state.protocol) {
      this.loadEvaluation()

      // clear the results from possible previous states
      this.setState(update(this.state, {testresults: {$set: []}}))
    }
  }

  loadEvaluation () {
    const endpoint = evaluationURI(this.state.protocol)

    fetch(endpoint, {method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
      .then(async response => {
        if (response.status !== 200) {
          const errorMessage = await response.json()
          throw errorMessage
        }

        return response.json()
      }).then(data => this.prepareData(data))
      .catch(error => {
        this.growl.show({severity: 'error', summary: 'Failure', detail: error.message})
      })
  }

  prepareData (rawData) {
    let chartData = { // = this.state.chart_data // take the default value as template
      labels: [],
      datasets: [
        {
          label: 'PASS',
          backgroundColor: '#009900',
          borderColor: '#005500',
          data: [10, 3, 30, 4, 1]
        }, {
          label: 'INCONCLUSIVE',
          backgroundColor: '#999900',
          borderColor: '#555500',
          data: [10, 3, 30, 4, 5]
        },
        {
          label: 'FAIL',
          backgroundColor: '#990000',
          borderColor: '#550000',
          data: [10, 3, 30, 4, 7]
        }
      ]
    }

    let summary = rawData['summary']

    // TODO: Refactor!
    // iterating over summary.statistic.[pass, fail, etc..]
    chartData['labels'] = summary.map(e => e['sut'] + ' ' + e['version'])
    chartData['datasets'][0]['data'] = summary.map(e => e['statistic']['pass'])
    chartData['datasets'][1]['data'] = summary.map(e => e['statistic']['inconc'])
    chartData['datasets'][2]['data'] = summary.map(e => e['statistic']['fail'])

    let newState = update(this.state, {
      chart_data: {$set: chartData}
    })
    this.setState(newState)

    // create test results for TabPanels
    let results = rawData['results']
    results.forEach(tr => {
      let nameVersion = tr['sut']
      let testResultsData = {
        name: nameVersion,
        items: tr['items']
      }

      let newTestResults = this.state.testresults.concat(testResultsData)
      this.setState({testresults: newTestResults})
    })
  }

  render () {
    return (
      <div>
        <Growl ref={(el) => this.growl = el} />
        <Chart type='bar' data={this.state.chart_data} />

        <h3>Test Results</h3>
        {
          (this.state.testresults[0] !== undefined)
            ? (
              <TabView>
                {
                  this.state.testresults.map(tr =>
                    <TabPanel key={tr.name} header={tr.name} leftIcon='pi pi-angle-double-down'>
                      <TestResults testResults={tr.items} protocol={this.props.protocol} />
                    </TabPanel>
                  )
                }
              </TabView>
            ) : (<p>No Test Results available</p>)
        }

      </div>
    )
  }
}
