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
import classNames from 'classnames'

export const SubmenuIcons = (name) => {
  name = name.toLowerCase()
  let source = require('../../resources/images/overlay.svg')
  switch (name) {
    case 'mqtt':
    case 'coap':
    case 'opc':
    case 'opc-ua':
    case 'opcua':
      source = require('../../resources/images/components.svg')
      break
    case 'tools':
      source = require('../../resources/images/misc.svg')
      break
  }

  return source
}

export default class Submenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div className='layout-submenu'>
        <a id='menu_input' onClick={(event) => this.props.openMenu(event, this.props.id)} className={classNames({ 'active-menuitem': this.props.activeMenu === this.props.id })}>
          <img alt='input' className='layout-menu-icon-inactive' src={SubmenuIcons(this.props.title)} />
          <img alt='input' className='layout-menu-icon-active' src={SubmenuIcons(this.props.title)} />
          <span>{this.props.title}</span>
        </a>
        <div className={classNames({ 'submenuhide': this.props.activeMenu !== this.props.id, 'submenushow': this.props.activeMenu === this.props.id })}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
