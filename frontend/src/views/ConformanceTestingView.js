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
import withProtocolSwitch from '../utils/hoc/ProtocolSwitch'
import MQTTView from '../views/MQTTView'

class ConformanceTestingView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  renderView () {
    if (this.props.protocol === 'mqtt') {
      return (<MQTTView />)
    } else {
      return (<p>No view for {this.props.protocol}</p>)
    }
  }

  render () {
    const view = this.renderView()
    return (
      <div className='content-section section-content'>
        {view}
      </div>
    )
  }
}

const WrappedComponent = withProtocolSwitch(ConformanceTestingView)
export default WrappedComponent
