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
import FileTreeTable from '../components/FileTreeTable'

import {readableProtocol} from '../utils/ProtocolNamings'
import withProtocolSwitch from '../utils/hoc/ProtocolSwitch'

class HistoryView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          {
            (this.props.protocol)
            ? <h1>Test Run History {readableProtocol(this.props.protocol)}</h1>
            : <h1>Test Run History</h1>
          }
        </div>

        <div className='content-section section-content'>
          <Growl ref={(el) => this.growl = el} />
          <h3>Browse Historical Files</h3>
          <div className='ui-g ui-fluid'>
            <div className='ui-g-12'>
              <FileTreeTable protocol={this.props.protocol} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const WrappedComponent = withProtocolSwitch(HistoryView)
export default WrappedComponent
