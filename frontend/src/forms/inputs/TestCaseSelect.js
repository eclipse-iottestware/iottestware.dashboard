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
import {Tree} from 'primereact/tree'
import {Growl} from 'primereact/growl'
import update from 'immutability-helper'
import { testcasesURI } from '../../utils/BackendEndpoints'

export default class TestCaseSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      selected: []
    }

    this.handleSelectionChange = this.handleSelectionChange.bind(this)
  }

  handleSelectionChange (event) {
    this.setState(update(this.state, {selected: {$set: event.selection}}))

    // forward the selected testcases
    let testcases = []
    event.selection.map(s => {
      if (s.data === 'testcase') { testcases.push(s.label) }
    })
    this.props.handleSelectionChange(testcases)
  }

  componentDidMount () {
    fetch(testcasesURI(this.props.protocol), {method: 'GET',
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
      }).then(payload => {
        let tcs = payload.PICS
        let testcasesData = []
        Object.entries(tcs).map(([key, value]) => {
          let testcases = []
          value.map(v => testcases.push({'label': v, 'data': 'testcase'}))

          let item = {
            'label': key,
            'data': 'PICS',
            'expandedIcon': 'fa fa-fw fa-minus-square-o',
            'collapsedIcon': 'fa fa-fw fa-plus-square-o',
            'children': testcases
          }
          testcasesData.push(item)
        })
        this.setState(update(this.state, {data: {$set: testcasesData}}))
      }).catch(error => {
        this.growl.show({severity: 'error', summary: 'Incorrect Input', detail: error.message})
      })
  }

  render () {
    return (
      <div className='testcase-select'>
        <Growl ref={(el) => this.growl = el} />
        <Tree value={this.state.data}
          selectionMode='checkbox'
          selection={this.state.selected}
          selectionChange={this.handleSelectionChange} />
      </div>
    )
  }
}
