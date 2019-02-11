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
import update from 'immutability-helper'

export default class GDPRView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      status: null,
      regulation: null,
      text: null
    }

    this.getContent()
  }

  getContent () {
    fetch('/v1/dataprotection/gdpr', {
      method: 'GET'
    }).then((response) => {
      const respStatus = update(this.state, {status: {$set: response.status}})
      this.setState(respStatus)
      return response.json()
    }).then((responseData) => {
      const regulation = update(this.state, {regulation: {$set: responseData.regulation}})
      this.setState(regulation)

      const text = update(this.state, {text: {$set: responseData.text}})
      this.setState(text)
    })
  }

  render () {
    return (

      <div>
        <div className='content-section section-header section-header-small'>
          <h1>General Data Protection Compliance</h1>
        </div>
        <div className='content-section section-content'>
          {
            (this.state.status == null)
              ? <p>No compliance information available</p>
              : <p>{this.state.text}</p>
          }
        </div>
      </div>
    )
  }
}
