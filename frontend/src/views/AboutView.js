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

export default class GettingStartedView extends React.Component {
  render () {
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          <h1>About IoT-Testware</h1>
        </div>

        <div className='content-section section-content'>
          <h3>Default</h3>
          <p>and more text here</p>
        </div>
      </div>
    )
  }
}
