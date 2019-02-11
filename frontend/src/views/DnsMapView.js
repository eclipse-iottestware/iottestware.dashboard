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
import { Link } from 'react-router-dom'

export default class DnsMapView extends React.Component {
  render () {
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          <h1>dns-map</h1>
        </div>

        <div className='content-section section-content'>
          TODO: arp terminal command like ping:
          <Link to={'https://tools.kali.org/information-gathering/dnsenum'}>dnsenum</Link>
          <Link to={'https://tools.kali.org/information-gathering/dnsmap'}>dnsmap</Link>
          <Link to={'https://tools.kali.org/information-gathering/dnsrecon'}>dnsrecon</Link>
          <Link to={'hhttps://tools.kali.org/information-gathering/dnstracer'}>dnstracer</Link>
          <Link to={'hhttps://tools.kali.org/information-gathering/dnswalk'}>dnswalk</Link>
        </div>
      </div>
    )
  }
}