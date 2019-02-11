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
import NavigationbarDemo from '../demos/NavigationbarDemo'

export default class HomeView extends React.Component {
  render () {
    return (
      <div>
        <div className='content-section section-header section-header-large'>
          <h1>IoT-Testware</h1>
          <NavigationbarDemo />
        </div>

        <div className='content-section section-content'>
          <p>It is the aim of the project to supply a rich set of TTCN-3 test suites and test cases for IoT technologies to enable developers in setting up a comprehensive test environment of their own, if needed from the beginning of a project. TTCN-3 has been defined and standardized by the European Telecommunication Standards Institute in ETSI ES 201873 and related extension packages. It is implemented and supported in Eclipse IoT by the Titan project.</p>

          <p>The initial contribution of IoT-Testware to Eclipse will focus on protocols like CoAP and MQTT. This list will be extended during the project. To ensure test and implementation technology independence, and the test suites will be realized in TTCN-3 and implemented with Titan. The test suites will contain tests for conformance, interoperability, robustness, and security aspects.</p>

          <p>Eclipse Titan has already protocol modules for IoT including type systems and codec. IoT-Testware will rely on these type systems and develop codec libraries and test cases based on them.</p>

          <p>The IoT-Testware test suites will have a well-defined test suite structure (TSS) and a set of protocol implementation conformance statements (PICS) as well as protocol implementation extra information for testing (PIXIT). The work will follow the standardized approach as defined in ISO “Conformance Test Methodology and Framework” ISO 9646 and the best practices as described by ETSI White Paper No 3 “Achieving Technical Interoperability – the ETSI Approach”.</p>
        </div>
      </div>
    )
  }
}
