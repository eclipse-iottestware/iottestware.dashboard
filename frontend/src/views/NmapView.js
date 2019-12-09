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
import NmapForm from '../forms/NmapForm'
import Terminal from '../components/TerminalComponent'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import ViewStateEnum from '../utils/ViewStateEnum'
import io from 'socket.io-client'

export default class NmapView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewState: ViewStateEnum.CONF,
      nmapReport: {
        hosts: []
      }
    }

    this.nextViewState = this.nextViewState.bind(this)
  }

  componentDidMount () {
    const that = this
    this.socket = io('/')
    this.socket.on('nmap/report', function (newData) {
      that.setState({
        nmapReport: newData
      })
    })
  }

  componentWillUnmount () {
    this.socket.close()
  }

  nextViewState () {
    this.setState({viewState: ViewStateEnum.RUN})
  }

  singleHost (item) {
    const ports = item.ports
    return (
      <div key={item.host}>
        <h3>{item.host}</h3>
        <DataTable value={ports}>
          <Column field='port' header='Port' />
          <Column field='transport' header='Transport' />
          <Column field='state' header='State' />
          <Column field='service' header='Service' />
        </DataTable>
      </div>
    )
  }

  renderNmapReport () {
    const report = this.state.nmapReport.hosts.map(i => this.singleHost(i))
    return (
      <div>
        <Terminal title={'Nmap'} />
        <hr />
        {report}
      </div>
    )
  }

  render () {
    let r
    if (this.state.viewState === ViewStateEnum.CONF) {
      r = <NmapForm nextViewState={this.nextViewState} />
    } else {
      r = this.renderNmapReport()
    }

    return (
      <div>
        <div className='content-section section-header section-header-small'>
          <h1>Nmap Tool</h1>
        </div>

        <div className='content-section section-content'>
          { r }
        </div>
      </div>
    )
  }
}
