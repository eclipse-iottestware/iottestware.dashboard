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

import 'nanoscroller'
import jQuery from 'jquery'
import Submenu from './Submenu'

export default class NavigationMenu extends React.Component {
  constructor () {
    super()
    this.state = {
      activeMenu: -1
    }

    this.openMenu = this.openMenu.bind(this)
  }

  openMenu (event, val) {
    this.setState({ activeMenu: this.state.activeMenu === val ? -1 : val })
    setTimeout(() => jQuery(this.scrollContainer).nanoScroller(), 350)
    event.preventDefault()
  }

  componentDidMount () {
    jQuery(this.scrollContainer).nanoScroller({ flash: true })
  }

  componentWillUnmount () {
    jQuery(this.scrollContainer).nanoScroller({ destroy: true })
  }

  render () {
    return (
      <div ref={(el) => this.scrollContainer = el} className='nano'>
        <div className='nano-content'>
          <div className='layout-menu'>
            <Submenu title={'General'} id={0} openMenu={this.openMenu} activeMenu={this.state.activeMenu}>
              <Link to='/started'><i className='fa fa-fw fa-play' /> Getting Started</Link>
              <Link to='/about'><i className='fa fa-fw fa-dashboard' /> About</Link>
              <Link to='/history'><i className='fa fa-fw fa-history' /> History</Link>
              <Link to='/testsuites'><i className='fa fa-fw fa-check-square' /> Test Suites</Link>
              <Link to='/resources'><i className='fa fa-fw fa-compass' /> Resources</Link>
              <Link to='/help'><i className='fa fa-fw fa-life-ring' /> Help</Link>
            </Submenu>

            <Submenu title={'MQTT'} id={1} openMenu={this.openMenu} activeMenu={this.state.activeMenu}>
              <Link to='/testpurposes/mqtt'><i className='fa fa-fw fa-book' /> Test Purposes</Link>
              <Link to='/conformance/mqtt'><i className='fa fa-fw fa-check-square' /> Conformance Testing</Link>
              <Link to='/history/mqtt'><i className='fa fa-fw fa-history' /> History</Link>
              <Link to='/eval/mqtt'><i className='fa fa-fw fa-area-chart' /> Evaluation</Link>
              <Link to='/fuzzing/mqtt'><i className='fa fa-fw fa-bomb' /> Fuzzing</Link>
              <Link to='/resources/mqtt'><i className='fa fa-fw fa-compass' /> Resources</Link>
              <Link to='/help/mqtt'><i className='fa fa-fw fa-life-ring' /> Help</Link>
            </Submenu>

            <Submenu title={'CoAP'} id={2} openMenu={this.openMenu} activeMenu={this.state.activeMenu}>
              <Link to='/testpurposes/coap'><i className='fa fa-fw fa-book' /> Test Purposes</Link>
              <Link to='/testsuites/coap'><i className='fa fa-fw fa-check-square' /> Conformance</Link>
              <Link to='/history/coap'><i className='fa fa-fw fa-history' /> History</Link>
              <Link to='/eval/coap'><i className='fa fa-fw fa-area-chart' /> Evaluation</Link>
              <Link to='/fuzzing/coap'><i className='fa fa-fw fa-bomb' /> Fuzzing</Link>
              <Link to='/resources/coap'><i className='fa fa-fw fa-compass' /> Resources</Link>
              <Link to='/help/coap'><i className='fa fa-fw fa-life-ring' /> Help</Link>
            </Submenu>

            <Submenu title={'OPC-UA'} id={3} openMenu={this.openMenu} activeMenu={this.state.activeMenu}>
              <Link to='/testpurposes/opcua'><i className='fa fa-fw fa-book' /> Test Purposes</Link>
              <Link to='/testsuites/opcua'><i className='fa fa-fw fa-check-square' /> Conformance</Link>
              <Link to='/tools/opcua'><i className='fa fa-fw fa-flag-checkered' /> Interoperability</Link>
              <Link to='/history/opcua'><i className='fa fa-fw fa-history' /> History</Link>
              <Link to='/eval/opcua'><i className='fa fa-fw fa-area-chart' /> Evaluation</Link>
              <Link to='/fuzzing/opcua'><i className='fa fa-fw fa-bomb' />  Fuzzing</Link>
              <Link to='/resources/opcua'><i className='fa fa-fw fa-compass' /> Resources</Link>
              <Link to='/help/opcua'><i className='fa fa-fw fa-life-ring' /> Help</Link>
            </Submenu>

            <Submenu title={'Tools'} id={4} openMenu={this.openMenu} activeMenu={this.state.activeMenu}>
              <Link to='/tools/ping'><i className='fa fa-fw fa-signal' /> ping</Link>
              <Link to='/tools/nmap'><i className='fa fa-fw fa-sitemap' /> nmap</Link>
            </Submenu>
          </div>
        </div>
      </div>
    )
  }
}
