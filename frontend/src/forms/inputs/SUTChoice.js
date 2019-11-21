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
import {SelectButton} from 'primereact/selectbutton'

export default class SUTChoice extends React.Component {
  render () {
    return (
      <div className='p-grid p-justify-center'>
        <div className='p-col-12'>
          <div className='box'>
            <SelectButton id={'configurationSelect'} value={this.props.value} options={this.props.options} onChange={this.props.onChange} />
          </div>
        </div>
      </div>
    )
  }
}
