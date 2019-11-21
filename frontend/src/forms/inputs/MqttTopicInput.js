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

export default class MqttTopicInput extends React.Component {
  constructor (props) {
    super(props)

    this.setDefaultValue = this.setDefaultValue.bind(this)
  }

  setDefaultValue (event, defaultValue, inputHandler) {
    if (!defaultValue) {
      defaultValue = 'eclipse/iot/testware/' + new Date().getSeconds()
    }
    event.target.value = defaultValue
    event.target.id = 'topic'
    inputHandler(event)
  }

  render () {
    return (
      <div className='p-col-12 p-md-6'>
        <div className='p-inputgroup'>
          <span className='p-inputgroup-addon'>
            <i className='fa fa-inbox'
              onClick={e => this.setDefaultValue(e, this.props.defaultValue, this.props.handleChange)} />
          </span>
          <InputText placeholder='Topic Name'
            tooltip='Topic Names [MQTT-4.7.1-1]'
            value={this.props.value}
            onChange={this.props.handleChange}
            id={'topic'}
            keyfilter={/(([alphanum]+|[/]*)+^[^#$+]+$)/} />
        </div>
      </div>
    )
  }
}
