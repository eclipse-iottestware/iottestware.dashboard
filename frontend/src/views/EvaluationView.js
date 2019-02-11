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
import EvaluationChart from '../components/EvaluationChart'

import { readableProtocol } from '../utils/ProtocolNamings'
import withProtocolSwitch from '../utils/hoc/ProtocolSwitch'

class EvaluationView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          <h1>Evaluation View {(this.props.protocol) ? readableProtocol(this.props.protocol) : ''}</h1>
        </div>

        <div className='content-section section-content'>
          {
            (this.props.protocol)
              ? <EvaluationChart protocol={this.props.protocol} />
              : <i className='pi pi-spin pi-spinner' style={{'fontSize': '3em'}} />
          }

        </div>
      </div>
    )
  }
}

const WrappedComponent = withProtocolSwitch(EvaluationView)
export default WrappedComponent
