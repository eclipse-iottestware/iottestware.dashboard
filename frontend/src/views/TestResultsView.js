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
import TestResults from '../components/TestResultsComponent'
import { readableProtocol } from '../utils/ProtocolNamings'
import withProtocolSwitch from '../utils/hoc/ProtocolSwitch'

class TestResultsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          {
            (this.props.protocol !== undefined)
            ? <h1>Conformance Test: {readableProtocol(this.props.protocol)}</h1>
            : <h1>Missing protocol</h1>
          }

        </div>

        <div className='content-section section-content'>
          {
            (this.props.protocol)
              ? <TestResults protocol={this.props.protocol} runningState />
              : <i className='pi pi-exclamation-triangle' style={{'fontSize': '3em'}} />
          }

        </div>
      </div>
    )
  }
}

const WrappedComponent = withProtocolSwitch(TestResultsView)
export default WrappedComponent
