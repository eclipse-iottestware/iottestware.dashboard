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
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/components/column/Column'
import { loadTestPurposes } from '../loaders/TestPurposesLoader'
import { testPurpose } from './TestPurpose'
import { Growl } from 'primereact/growl'

export default class TestPurposesTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      protocol: null,
      testpurposes: [],
      expandedRows: []
    }

    this.dataCallback = this.dataCallback.bind(this)
    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this)
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
      loadTestPurposes(this.state.protocol, this.dataCallback)

      // refresh the expandedRows by simply setting 'null' as the current value
      this.setState(update(this.state, {expandedRows: {$set: null}}))
      this.setState(update(this.state, {testpurposes: {$set: null}}))
    }
  }

  /**
   * This method will be called after TestPurpose received data or error
   * @param data
   * @param err
   */
  dataCallback (data, err) {
    if (err) {
      this.growl.show({severity: 'error', summary: 'Failure', detail: err.reason})
    }

    // TestPurposes in Data come as a map -> transform to array first
    let tpData = []
    Object.keys(data).forEach(item => {
      tpData.push(data[item])
    })

    this.setState(update(this.state, {testpurposes: {$set: tpData}}))
  }

  rowExpansionTemplate (data) {
    return (testPurpose(data))
  }

  render () {
    return (
      <div className='test-results'>
        <Growl ref={(el) => this.growl = el} />
        <DataTable value={this.state.testpurposes} expandedRows={this.state.expandedRows} onRowToggle={(e) => this.setState({expandedRows: e.data})}
          rowExpansionTemplate={this.rowExpansionTemplate}>
          <Column expander style={{width: '2em'}} header={<i className={'fa fa-hashtag'} />} />
          <Column field='id' header='ID' />
          <Column field='objective' header='Objective' style={{width: '65%'}} />
        </DataTable>
      </div>
    )
  }
}
