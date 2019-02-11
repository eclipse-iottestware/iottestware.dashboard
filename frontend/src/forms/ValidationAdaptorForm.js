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
import {FileUpload} from 'primereact/components/fileupload/FileUpload'

export default class ValidationAdaptorForm extends React.Component {
  render () {
    return (
      <div className='form'>
        <fieldset className='ui-input form-fieldset'>
          <input
            type='text'
            id='host'
            onChange={this.props.handleInputChange} />
          <label htmlFor='host'>
            <span data-text='Host'>Host:</span>
          </label>
        </fieldset>
        <fieldset className='ui-input form-fieldset'>
          <input
            type='text'
            id='port'
            onChange={this.props.handleInputChange} />
          <label htmlFor='port'>
            <span data-text='Port'>Port:</span>
          </label>
        </fieldset>

        <fieldset className='ui-fileupload form-upload'>
          <FileUpload name='demo' url='/v1/tools/validationAdaptor/upload' onUpload={this.props.handleUpload}
            accept='.xml' maxFileSize={1000000} />
        </fieldset>

        <button className='btn' onClick={this.props.handleSubmit}>VALIDATE</button>
      </div>
    )
  }
}
