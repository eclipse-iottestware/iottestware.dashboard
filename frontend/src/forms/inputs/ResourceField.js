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
import {Panel} from 'primereact/panel'
import {Button} from 'primereact/button'
import {InputText} from 'primereact/inputtext'

export default class ResourceField extends React.Component {
  constructor (props) {
    super(props)

    this.resourceTemplate = this.resourceTemplate.bind(this)
  }

  methodTemplate (method, id) {
    const methodName = method.name
    const methodValue = method.value
    const icon = methodValue ? 'fa fa-check' : 'fa fa-times'
    const key = methodName + '_' + id

    return (
      <div key={key} className='ui-g-12 ui-md-2'>
        <i className={icon} /> &nbsp; {methodName}
      </div>
    )
  }

  resourceTemplate (item) {
    if (!item) { return }

    return (
      <Panel key={item.id} header={item.id} style={{marginBottom: '0.5em', marginTop: '0.5em'}} toggleable>
        <div className='ui-g ui-fluid'>
          <div className='ui-g-12 ui-md-12'>

            {
              item.methods.map(m => this.methodTemplate(m, item.id))
            }

            <div key={'uri_' + item.uri} className='ui-g-12 ui-md-8 ui-inputgroup'>
              <span className='ui-inputgroup-addon'>
                <i className='fa fa-microchip' />
              </span>
              <InputText
                defaultValue={item.uri}
                id={'uri'} disabled />
            </div>
            <div className='ui-g-12 ui-md-2'>
              <Button icon='fa fa-edit' type='button' />
            </div>
            <div className='ui-g-12 ui-md-2'>
              <Button icon='fa fa-trash' type='button' onClick={e => this.props.remove(item.id)} />
            </div>
          </div>

        </div>
      </Panel>
    )
  }

  render () {
    const resources = []
    this.props.resources.forEach(r => resources.push(this.resourceTemplate(r)))
    return (
      <div className='CoAPResourceFieldset'>
        <Panel header='Resources' style={{marginBottom: '2em', marginTop: '2em'}} toggleable>

          {
            resources
          }

        </Panel>
      </div>
    )
  }
}
