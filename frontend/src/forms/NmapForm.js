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
import {Button} from 'primereact/button'
import {Growl} from 'primereact/growl'
import HostInput from './inputs/HostInput'
import update from 'immutability-helper'

export default class NmapForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.id

    let newInputState = update(this.state, {
      [name]: {$set: value}
    })

    this.setState(newInputState)
  }

  handleSubmit (event) {
    const jsonRequest = JSON.stringify(this.state)

    fetch('/v1/tools/nmap/scan', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: jsonRequest
    }).then(async response => {
      if (response.status !== 200) {
        const errorMessage = await response.json()
        throw errorMessage
      }

      return response.json()
    }).then(payload => {
      console.log(payload.message)
      this.props.nextViewState()
    }).catch(error => {
      this.growl.show({severity: 'error', summary: 'Incorrect Input', detail: error.message})
    })

    // prevent the default behaviour of <form> which would reload the whole page
    event.preventDefault()
  }

  render () {
    return (
      <div className='form'>
        <Growl ref={(el) => this.growl = el} />
        <form onSubmit={event => { this.handleSubmit(event) }}>
          <h3 className='first'>Host</h3>
          <div className='ui-g ui-fluid'>
            <HostInput handleChange={this.handleChange} />
          </div>
          <div className='ui-g ui-fluid'>
            <div className='ui-g-12 ui-md-2'>
              <Button icon='fa fa-play' label='Run' type='submit' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}
