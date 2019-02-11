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

import NetworkInterfaces from '../components/NetworkInterfaces'
import { Link } from 'react-router-dom'
import React from 'react'

export default class Topbar extends React.Component {
  render () {
    return (
      <div>
        <a className='menu-button' onClick={this.props.openMenu}>
          <i className='fa fa-bars' />
        </a>

        <ul className='topbar-menu'>
          <li className='topbar-menu-interfaces'>
            <a>Interfaces</a>
            <NetworkInterfaces />
          </li>
          <li className='topbar-menu'>
            <Link to='/' >Home</Link>
          </li>

        </ul>
      </div>
    )
  }
}
