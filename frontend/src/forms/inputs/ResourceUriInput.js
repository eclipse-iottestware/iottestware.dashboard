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
import {Tooltip} from 'primereact/tooltip'

export default class ResourceUriInput extends React.Component {
  constructor (props) {
    super(props)

    this.setDefaultValue = this.setDefaultValue.bind(this)
  }

  setDefaultValue (event, defaultValue, inputHandler) {
    if (!defaultValue) {
      defaultValue = 'eclipse/iot/testware/' + new Date().getSeconds()
    }
    event.target.value = defaultValue
    event.target.id = this.props.id
    inputHandler(event)
  }

  render () {
    return (
      <div className='ui-g-12 ui-md-6'>
        <div className='ui-inputgroup'>
          <span className='ui-inputgroup-addon'>
            <i className='fa fa-microchip'
              onClick={e => this.setDefaultValue(e, this.props.defaultValue, this.props.handleChange)} />
          </span>
          <Tooltip for={'#uri'}
            title='The URI of the Resource'
            tooltipEvent='hover'
            showDelay={1000}
            hideDelay={500} />
          <InputText placeholder='URI'
            value={this.props.value}
            onChange={this.props.handleChange}
            id={this.props.id}
            keyfilter={/(([alphanum]+|[/]*)+^[^#$+]+$)/} />
        </div>
      </div>
    )
  }
}
