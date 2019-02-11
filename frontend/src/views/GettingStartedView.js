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
import {Menu} from 'primereact/menu'

export default class GettingStartedView extends React.Component {
  constructor () {
    super()
    this.state = {
      items: [
        {
          label: 'Tools',
          items: [
            { label: 'Terminal', icon: 'fa fa-fw fa-terminal', url: '/demo/terminal' },
            { label: 'Ping', icon: 'fa fa-fw fa-podcast', url: '/tools/ping'},
            { label: 'Nmap', icon: 'fa fa-fw fa-binoculars', url: '/tools/nmap' }
          ]
        }, {
          label: 'Test Suites',
          items: [
            {label: 'MQTT', icon: 'fa fa-fw fa-check-circle', url: '/testsuites/mqtt'},
            {label: 'CoAP', icon: 'fa fa-fw fa-check-circle', url: '/testsuites/coap'},
            {label: 'OPC-UA', icon: 'fa fa-fw fa-check-circle', url: '/testsuites/opcua'}
          ]
        }
      ]
    }
  }

  render () {
    return (
      <div>
        <div className='content-section section-header section-header-large'>
          <h1>Getting Started</h1>
          <NavigationbarDemo />
        </div>

        <div className='content-section section-content'>
          <Menu model={this.state.items} />
        </div>
      </div>
    )
  }
}
