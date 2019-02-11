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
import Terminal from '../components/TerminalComponent'

export default class TerminalView extends React.Component {
  render () {
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          <h1>Terminal Component</h1>
        </div>
        <div className='content-section section-content'>
          <Terminal title={'IoT-Testware'} />
        </div>
      </div>
    )
  }
}
