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
import {InputText} from 'primereact/inputtext'
import {Password} from 'primereact/password'
import {Button} from 'primereact/button'

export default class PasswordInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      masked: false,
      value: ''
    }

    this.swapMasked = this.swapMasked.bind(this)
    this.changeHandler = this.changeHandler.bind(this)
    this.setRandomPassword = this.setRandomPassword.bind(this)
    this.renderMasked = this.renderMasked.bind(this)
    this.renderUnmasked = this.renderUnmasked.bind(this)
  }

  setRandomPassword (event) {
    event.target.value = Math.random().toString(36).slice(-10)
    event.target.id = 'password'
    this.changeHandler(event)
  }

  swapMasked (event) {
    let newState = !this.state.masked
    this.setState({masked: newState})
  }

  changeHandler (event) {
    let newValue = event.target.value
    this.setState({value: newValue})

    // forward the event
    this.props.handleChange(event)
  }

  renderMasked () {
    return (
      <InputText placeholder='Password'
        onChange={this.changeHandler}
        value={this.state.value}
        id={'password'} />
    )
  }

  renderUnmasked () {
    return (
      <Password onChange={this.changeHandler}
        value={this.state.value}
        id={'password'} />

    )
  }

  render () {
    let masked = this.state.masked
    let input
    if (masked) {
      input = this.renderMasked()
    } else {
      input = this.renderUnmasked()
    }

    return (
      <div className='ui-g-12 ui-md-6'>
        <div className='ui-inputgroup'>
          <span className='ui-inputgroup-addon'>
            <i className='fa fa-user-secret'
              onClick={e => this.setRandomPassword(e)} />
          </span>
          {input}
          <Button type='button' icon={(this.state.visible) ? 'fa fa-eye-slash' : 'fa fa-eye'} onClick={this.swapMasked} />
        </div>
      </div>
    )
  }
}
