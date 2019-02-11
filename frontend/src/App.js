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
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import '../styles/main.scss'
import '../public/favicon.ico'

import NavigationMenu from './navigation/NavigationMenu'
import Routes from './navigation/Routes'
import Footer from './navigation/Footer'
import { BrowserRouter as Router } from 'react-router-dom'
import Topbar from './navigation/Topbar'

class App extends React.Component {
  constructor () {
    super()
    this.state = {}
    this.onSidebarClick = this.onSidebarClick.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.openMenu = this.openMenu.bind(this)
  }

  onSidebarClick (event) {
    if (event.target.nodeName === 'A' && event.target.parentNode.className.indexOf('layout-menu') === -1) {
      this.closeMenu(event)
    }
  }

  openMenu (event) {
    this.setState({ menuActive: !this.state.menuActive })
    event.preventDefault()
  }

  closeMenu (event) {
    this.setState({ menuActive: false })
    event.preventDefault()
  }

  render () {
    return (
      <Router>
        <div className='layout-wrapper'>
          <div id='layout-topbar'>
            <Topbar openMenu={this.openMenu} />
          </div>

          <div id='layout-sidebar' className={classNames({ 'active': this.state.menuActive === true })} onClick={this.onSidebarClick}>
            <NavigationMenu />
          </div>

          <div className={classNames({ 'layout-mask': this.state.menuActive === true })} />

          <div id='layout-content'>
            <Routes />

            <div className='content-section layout-footer clearfix'>
              <Footer />
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
