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

export default class HomeView extends React.Component {
  render () {
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          <h1>Test View</h1>
        </div>

        <div className='content-section section-content'>
          <p>The IoT-Testware test suites will have a well-defined test suite structure (TSS) and a set of protocol implementation conformance statements (PICS) as well as protocol implementation extra information for testing (PIXIT). The work will follow the standardized approach as defined in ISO “Conformance Test Methodology and Framework” IS 9646 and the best practices as described by ETSI White Paper No 3 “Achieving Technical Interoperability – the ETSI Approach”.</p>
        </div>
      </div>
    )
  }
}
