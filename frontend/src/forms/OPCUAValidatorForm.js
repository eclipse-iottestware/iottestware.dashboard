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
import {Button} from 'primereact/components/button/Button'
import {Growl} from 'primereact/growl'
import update from 'immutability-helper'
import io from 'socket.io-client'

export default class OPCUAValidatorForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fileId: null,
      validationDisabled: true,
      isRunning: false
    }
    this.onUpload = this.onUpload.bind(this)
    this.onValidate = this.onValidate.bind(this)
    // this.onGetLogfile = this.onGetLogfile.bind(this)
  }

  componentDidMount () {
    this.socket = io('/')
    this.socket.on('ipkValidator/finish', (newData) => {
      this.setState(update(this.state, {isRunning: {$set: false}}))
      this.growl.show({severity: 'success', summary: 'Validator Finished', detail: 'opc_log.xml created'})
    })
  }

  componentWillUnmount () {
    this.socket.close()
  }

  onUpload (event) {
    const response = JSON.parse(event.xhr.response)
    const fileId = response['id']
    this.setState({fileId: fileId, validationDisabled: false})

    this.growl.show({severity: 'success', summary: 'File uploaded', detail: fileId})
  }

  onValidate (event) {
    // disable the Log-button each time you click on the Validate Button
    this.setState(update(this.state, {validationDisabled: {$set: true}}))
    this.setState(update(this.state, {isRunning: {$set: true}}))

    fetch('/v1/tools/opc/run/' + this.state.fileId, {method: 'GET'})
      .then(async response => {
        if (response.status !== 200) {
          const errorMessage = await response.json().message
          const err = new Error(errorMessage)
          throw err
        }
        this.growl.show({severity: 'success', summary: 'Validator Started', detail: 'waiting for validator to finish'})
      }).catch(error => {
        this.growl.show({severity: 'error', summary: 'Error', detail: error.message})
      })

    // TODO: do I need form event?
    // prevent the default behaviour of <form> which would reload the whole page
    event.preventDefault()
  }

  /*
  onGetLogfile (event) {
    fetch('/v1/tools/opc/log/' + this.state.fileId, {method: 'GET'})
      .then(async response => {
        if (response.status !== 200) {
          const errorMessage = await response.json()
          throw errorMessage
        }

        return response.json()
      })
      .then(payload => {
        console.log('====== ' + payload.message)
        this.growl.show({severity: 'success', summary: 'Logfile', detail: payload.message})
      })
      .catch(error => {
        this.growl.show({severity: 'error', summary: 'Error', detail: 'Something went wrong'})
      })
  } */

  render () {
    return (
      <div className='form'>
        <Growl ref={(el) => this.growl = el} />

        <fieldset className='ui-fileupload form-upload'>
          <FileUpload name='configuration' url='/v1/tools/opc/upload' onUpload={this.onUpload}
            accept='application/xml' maxFileSize={1000000} />
        </fieldset>

        <div className='ui-g ui-fluid'>
          <div className='ui-g-12 ui-md-2'>
            {
              (this.state.isRunning)
                ? <i className='pi pi-spin pi-spinner' style={{'fontSize': '3em'}} />
                : <Button icon='fa fa-play' label='Run' type='submit' disabled={this.state.validationDisabled} onClick={event => { this.onValidate(event) }} />
            }
          </div>
        </div>

      </div>
    )
  }
}
