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
import {Menubar} from 'primereact/components/menubar/Menubar'
import {Button} from 'primereact/button'

export default class NavigationbarDemo extends React.Component {
  render () {
    let items = [
      {
        label: 'Start',
        icon: 'fa fa-fw fa-play',
        url: '/started'
      }, {
        label: 'Tools',
        items: [
          { label: 'Terminal', icon: 'fa fa-fw fa-terminal', url: '/demo/terminal' },
          { label: 'Ping', icon: 'fa fa-fw fa-podcast', url: '/tools/ping' },
          { label: 'Nmap', icon: 'fa fa-fw fa-binoculars', url: '/tools/nmap' }
        ]
      }, {
        label: 'Test Suites',
        icon: 'fa fa-fw fa-check-circle',
        items: [
              {label: 'MQTT', icon: 'fa fa-fw fa-check-circle', url: '/testsuites/mqtt'},
              {label: 'CoAP', icon: 'fa fa-fw fa-check-circle', url: '/testsuites/coap'},
              {label: 'OPC-UA', icon: 'fa fa-fw fa-check-circle', url: '/testsuites/opcua'}
        ]
      }, {
        label: 'Reporting',
        icon: 'fa fa-fw fa-tasks',
        items: [
            {label: 'MQTT', icon: 'fa fa-fw fa-file-pdf-o', command: (event) => { window.open('/v1/report/mqtt') }},
            {label: 'CoAP', icon: 'fa fa-fw fa-file-pdf-o', command: (event) => { window.open('/v1/report/coap') }},
            {label: 'OPC-UA', icon: 'fa fa-fw fa-file-pdf-o', command: (event) => { window.open('/v1/report/opcua') }}
        ]
      }, {
        label: 'Icons',
        icon: 'fa fa-fw fa-bicycle',
        items: [
          {label: 'Theming', icon: 'fa fa-fw fa-btc', url: '/theming'},
          {label: 'Icons', icon: 'fa fa-fw fa-ethereum', url: '/icons'},
          {label: 'Star', icon: 'fa fa-fw fa-star'},
          {label: 'Space Shuttle', icon: 'fa fa-fw fa-space-shuttle'},
          {label: 'WiFi', icon: 'fa fa-fw fa-wifi'},
          {label: 'Wrench', icon: 'fa fa-fw fa-wrench'},
          {label: 'Warning', icon: 'fa fa-fw fa-warning'},
          {
            label: 'File Types',
            icon: 'fa fa-fw fa-file',
            items: [
              {label: 'Excel', icon: 'fa fa-fw fa-file-excel-o'},
              {label: 'PDF', icon: 'fa fa-fw fa-file-pdf-o'},
              {label: 'Sound', icon: 'fa fa-fw fa-file-sound-o'},
              {label: 'Word', icon: 'fa fa-fw fa-file-word-o'},
              {label: 'Archive', icon: 'fa fa-fw fa-file-archive-o'},
              {label: 'Image', icon: 'fa fa-fw fa-file-photo-o'},
              {label: 'Text', icon: 'fa fa-fw fa-file-text'},
              {label: 'zip', icon: 'fa fa-fw fa-file-zip-o'}
            ]
          },
          {
            label: 'Chart Icons',
            icon: 'fa fa-fw fa-area-chart',
            items: [
              {label: 'Pie chart', icon: 'fa fa-fw fa-pie-chart'},
              {label: 'Bar chart', icon: 'fa fa-fw fa-bar-chart'},
              {label: 'Line chart', icon: 'fa fa-fw fa-line-chart'}
            ]
          }
        ]
      }
    ]

    return (
      <Menubar model={items}>
        <Button label='Settings' icon='fa fa-cog' style={{marginLeft: 4}} />
      </Menubar>
    )
  }
}
