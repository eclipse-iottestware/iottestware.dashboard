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
import {Panel} from 'primereact/panel'
import {Checkbox} from 'primereact/checkbox'
import {Growl} from 'primereact/growl'
import IdentifierInput from '../inputs/IdentifierInput'
import update from 'immutability-helper'
import ResourceUriInput from './ResourceUriInput'

export default class ResourceInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      GET: true,
      POST: true,
      DELETE: true,
      UPDATE: true,
      uri: '',
      resourceId: '',
      panelCollapsed: true
    }

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.addResource = this.addResource.bind(this)
    this.isChecked = this.isChecked.bind(this)
  }

  isChecked (method) {
    if (method in this.state) {
      return this.state[method]
    } else {
      return false
    }
  }

  handleCheckboxChange (event) {
    this.setState(update(this.state, {
      [event.value]: {$set: event.checked}
    }))
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const id = target.id

    this.setState(update(this.state, {
      [id]: {$set: value}
    }))
  }

  addResource () {
    // TODO: add additional uri and ID checking
    // see InputMask -> https://www.primefaces.org/primereact/#/inputmask
    if (this.state.resourceId.trim() === '') {
      this.growl.show({severity: 'error', summary: 'Missing Input', detail: 'Please enter a valid Resource ID/Name'})
    } else if (this.state.uri.trim() === '') {
      this.growl.show({severity: 'error', summary: 'Missing Input', detail: 'Please enter a valid URI'})
    } else if (!(this.state.GET || this.state.POST || this.state.UPDATE || this.state.DELETE)) {
      this.growl.show({severity: 'error', summary: 'Missing Input', detail: 'At least one method must be selected'})
    } else {
      this.growl.show({severity: 'success', summary: 'New Resource', detail: 'Added new CoAP Resource: ' + this.state.resourceId})
      const newResource = {
        'id': this.state.resourceId,
        'uri': this.state.uri,
        'methods': [
            {'name': 'GET', 'value': this.state.GET},
            {'name': 'POST', 'value': this.state.POST},
            {'name': 'UPDATE', 'value': this.state.UPDATE},
            {'name': 'DELETE', 'value': this.state.DELETE}
        ]
      }
      this.props.addResource(newResource)

      // clear the states for next resource
      const clearState = {
        GET: true,
        POST: true,
        DELETE: true,
        UPDATE: true,
        uri: '',
        resourceId: ''
      }
      this.setState(clearState)
    }
  }

  render () {
    return (
      <Panel header='Resource Creator' style={{marginTop: '2em'}} toggleable collapsed={this.state.panelCollapsed} onToggle={(e) => this.setState({panelCollapsed: e.value})}>
        <Growl ref={(el) => this.growl = el} />
        <div className='ui-g ui-fluid'>
          <div className='ui-g-12 ui-md-3'>
            <div className='ui-inputgroup'>
              <Checkbox inputId='get_' value='GET' onChange={this.handleCheckboxChange} checked={this.isChecked('GET')} />
              <label htmlFor='get'>GET</label>
            </div>
          </div>
          <div className='ui-g-12 ui-md-3'>
            <div className='ui-inputgroup'>
              <Checkbox inputId='post_' value='POST' onChange={this.handleCheckboxChange} checked={this.isChecked('POST')} />
              <label htmlFor='post'>POST</label>
            </div>
          </div>
          <div className='ui-g-12 ui-md-3'>
            <div className='ui-inputgroup'>
              <Checkbox inputId='get_' value='UPDATE' onChange={this.handleCheckboxChange} checked={this.isChecked('UPDATE')} />
              <label htmlFor='update'>UPDATE</label>
            </div>
          </div>
          <div className='ui-g-12 ui-md-3'>
            <div className='ui-inputgroup'>
              <Checkbox inputId='post_' value='DELETE' onChange={this.handleCheckboxChange} checked={this.isChecked('DELETE')} />
              <label htmlFor='delete'>DELETE</label>
            </div>
          </div>
          <div className='ui-g-12 ui-md-12'>
            <IdentifierInput
              handleChange={this.handleInputChange}
              value={this.state.resourceId}
              placeholder='Resource ID'
              id='resourceId' />
            <ResourceUriInput
              handleChange={this.handleInputChange}
              value={this.state.uri}
              placeholder='URI'
              id='uri' />
            <div className='ui-g-12 ui-md-10' />
            <div className='ui-g-12 ui-md-2'>
              <Button type='button' icon='fa fa-plus' label='' onClick={this.addResource} />
            </div>
          </div>
        </div>
      </Panel>
    )
  }
}
