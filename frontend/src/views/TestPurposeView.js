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
import {Growl} from 'primereact/growl'
import {readableProtocol} from '../utils/ProtocolNamings'
import TestPurposesTable from '../components/TestPurposesTable'
import withProtocolSwitch from '../utils/hoc/ProtocolSwitch'

class TestPurposeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  renderUndefined () {
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          <h1>Missing protocol</h1>
        </div>

        <div className='content-section section-content'>
          <div className='ui-g ui-fluid'>
            <div className='ui-g-12'>
              <i className='pi pi-exclamation-triangle' style={{'fontSize': '3em'}} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderProtocol (protocol) {
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          <h1>Test Purposes {readableProtocol(protocol)}</h1>
        </div>

        <div className='content-section section-content'>
          <Growl ref={(el) => this.growl = el} />
          <h3>Browse Test Purposes for {readableProtocol(protocol)}</h3>
          <div className='ui-g ui-fluid'>
            <div className='ui-g-12'>
              <TestPurposesTable protocol={protocol} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      (this.props.protocol)
      ? this.renderProtocol(this.props.protocol)
      : this.renderUndefined()
    )
  }
}

const WrappedComponent = withProtocolSwitch(TestPurposeView)
export default WrappedComponent
