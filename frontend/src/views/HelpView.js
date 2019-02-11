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

import {readableProtocol} from '../utils/ProtocolNamings'
import withProtocolSwitch from '../utils/hoc/ProtocolSwitch'
import update from 'immutability-helper'
import { testsuiteVersionURI } from '../utils/BackendEndpoints'

class HelpView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      version: null
    }

    this.loadResources = this.loadResources.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const protocol = nextProps.protocol
    this.loadResources(protocol)
  }

  loadResources (protocol) {
    const endpoint = testsuiteVersionURI(protocol)

    if (endpoint) {
      fetch(endpoint, {method: 'GET'})
        .then(async response => {
          if (response.status !== 200) {
            const errorMessage = await response.json()
            throw errorMessage
          }
          return response.json()
        })
        .then(data => {
          this.setState(update(this.state, {version: {$set: data}}))
        }).catch(error => {
          console.log('ERROR Resourcefetch ' + error)
        })
    }
  }

  // TODO: deliver all available test suites?
  renderUndefined () {
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          <h1>Help</h1>
        </div>

        <div className='content-section section-content'>
          {
            <p>Help content TBD</p>
          }
        </div>
      </div>
    )
  }

  // TODO: go on from here!
  renderProtocol (protocol) {
    if (this.state.version) {
      return (
        <div>
          <div className='content-section section-header section-header-small'>
            <h1>Help {readableProtocol(protocol)}</h1>
          </div>

          <div className='content-section section-content'>
            {
              <table border='1px solid' width='95%'>
                <thead>
                  <tr>
                    <td colSpan='100%'>Test Suite</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width='200'>Name</td>
                    <td><a href={this.state.version.testsuite.repository} target='_blank'>{readableProtocol(this.state.version.testsuite.name)}</a></td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{this.state.version.testsuite.date}</td>
                  </tr>
                  <tr>
                    <td>Commit</td>
                    <td><a href={this.state.version.testsuite.commit_link} target='_blank'>{this.state.version.testsuite.commit}</a></td>
                  </tr>
                </tbody>
              </table>
            }
            <br />
            {
              <table border='1px solid' width='95%'>
                <thead>
                  <tr>
                    <td colSpan='100%'>Titan</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width='200'>Product Number</td>
                    <td>{this.state.version.ttcn.product}</td>
                  </tr>
                  <tr>
                    <td>Build Date</td>
                    <td>{this.state.version.ttcn.build_date}</td>
                  </tr>
                  <tr>
                    <td>Compiler</td>
                    <td>{this.state.version.ttcn.compiler}</td>
                  </tr>
                </tbody>
              </table>
            }
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className='content-section section-header section-header-small'>
            <h1>Help {protocol}</h1>
          </div>

          <div className='content-section section-content'>
            {
              <p>Help content for {protocol} need's to be fetched from Backend</p>
            }
          </div>
        </div>
      )
    }
  }

  render () {
    return (
      (this.props.protocol)
        ? this.renderProtocol(this.props.protocol)
        : this.renderUndefined()
    )
  }
}

const WrappedComponent = withProtocolSwitch(HelpView)
export default WrappedComponent
