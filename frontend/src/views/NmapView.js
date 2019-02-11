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
import ViewStateEnum from '../utils/ViewStateEnum'

export default class NmapView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      viewState: ViewStateEnum.CONF
    }

    this.nextViewState = this.nextViewState.bind(this)
  }

  nextViewState () {
    this.setState({viewState: ViewStateEnum.RUN})
  }

  render () {
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          <h1>Nmap Tool</h1>
        </div>

        <div className='content-section section-content'>

          {
          (this.state.viewState === ViewStateEnum.CONF)
            ? <NmapForm nextViewState={this.nextViewState} /> : <Terminal title={'Nmap'} />
        }
        </div>
      </div>
    )
  }
}
