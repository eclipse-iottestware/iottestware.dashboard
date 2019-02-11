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

import {Button} from 'primereact/button'
import { TreeTable } from 'primereact/treetable'
import { Column } from 'primereact/components/column/Column'
import { Growl } from 'primereact/growl'
import {Dialog} from 'primereact/dialog'

import { loadHistory, downloadHistoryFile, downloadHistoryFolder, deleteHistoryFolder, readHistoryFile } from '../loaders/HistoryLoader'

export default class FileTreeTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedFile: null,
      history: null,
      content: null,
      protocol: null
    }

    this.dataCallback = this.dataCallback.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
    this.onDownload = this.onDownload.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onViewFile = this.onViewFile.bind(this)
  }

  componentDidMount () {
    const protocol = this.props.protocol
    this.setState(update(this.state, {protocol: {$set: protocol}}))
  }

  componentWillReceiveProps (nextProps) {
    const protocol = nextProps.protocol

    if (protocol !== this.state.protocol) {
      this.setState(update(this.state, {protocol: {$set: protocol}}))
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.protocol !== this.state.protocol) {
      loadHistory(this.state.protocol, this.dataCallback)

      // refresh the selection by simply setting 'null' as the current value
      this.setState(update(this.state, {selectedFile: {$set: null}}))
    }
  }

  /**
   * This method will be called after HistoryLoader received data or error
   * @param data
   * @param err
   */
  dataCallback (data, err) {
    if (err) {
      this.growl.show({severity: 'error', summary: 'Failure', detail: err.message})
    }
    this.setState(update(this.state, {history: {$set: data}}))
  }

  /**
   * This method is triggered on press of the download button
   * @param e
   */
  onDownload (e) {
    const timestamp = this.state.selectedFile.data.timestamp
    const fileName = this.state.selectedFile.data.name

    if (this.state.selectedFile.children) {
      const folderName = fileName

      // TODO: read the filename from header and remove the second param
      const zipFileName = fileName + '_' + timestamp + '.zip'
      downloadHistoryFolder(folderName, timestamp, zipFileName)
    } else {
      // download a single file
      const parent = this.state.selectedFile.data.parent
      downloadHistoryFile(parent, timestamp, fileName)
    }
  }

  /**
   * This method is triggered on press of the delete button
   * @param e
   */
  onDelete (e) {
    const timestamp = this.state.selectedFile.data.timestamp
    const fileName = this.state.selectedFile.data.name

    if (this.state.selectedFile.children) {
      const folderName = fileName

      // Trigger delete of a complete folder
      deleteHistoryFolder(folderName, timestamp, (message) => {
        this.growl.show({severity: 'success', summary: 'Deleted', detail: message})
      })

      // load updated history from backend
      loadHistory(this.state.protocol, this.dataCallback)
    } else {
      // Note: deleting single files not implemented!
    }
  }

  onViewFile (e) {
    const protocol = this.state.selectedFile.data.parent
    const timestamp = this.state.selectedFile.data.timestamp
    const fileName = this.state.selectedFile.data.name

    readHistoryFile(protocol, timestamp, fileName, (content) => {
      this.setState(update(this.state, {content: {$set: content}}))
    })
  }

  /**
   * This method is triggered each time the selection of field in the tree table changes
   * @param e
   */
  onSelectionChange (e) {
    this.setState(update(this.state, {selectedFile: {$set: e.selection}}))
  }

  render () {
    const data = (this.state.history) ? this.state.history : []
    let selected = 'None'

    if (this.state.selectedFile) {
      const name = this.state.selectedFile.data.name
      const timestamp = this.state.selectedFile.data.timestamp

      if (this.state.selectedFile.children) {
        selected = name + '_' + timestamp
      } else {
        selected = name + ' (' + timestamp + ')'
      }
    }

    const downloadDisabled = !(this.state.selectedFile)
    // enable delete button only if selected element is parent folder (and thus has children)
    const deleteDisabled = (this.state.selectedFile) ? !this.state.selectedFile.children : true

    // enable the view button only if a single file with a text content [.xml, .cfg, .json] is selected
    let viewDisabled = true
    if (this.state.selectedFile && !this.state.selectedFile.children) {
      const ext = this.state.selectedFile.data.name.split('.').pop()  // get the file extension
      if (ext === 'cfg' || ext === 'xml' || ext === 'json') { viewDisabled = false }
    }

    const dialogVisible = !!(this.state.content)
    const header = (this.state.selectedFile) ? this.state.selectedFile.data.name : 'None'
    const content = (this.state.content) ? this.state.content : <i className='pi pi-spin pi-spinner' style={{'fontSize': '3em'}} />

    return (
      <div>
        <Growl ref={(el) => this.growl = el} />

        <Dialog header={header} visible={dialogVisible} maximizable modal onHide={(e) => this.setState(update(this.state, {content: {$set: null}}))}>
          <xmp>{content}</xmp>
        </Dialog>

        <div className='ui-g-12 ui-md-1'>
          <Button icon='fa fa-fw fa-download' type='button' disabled={downloadDisabled} onClick={this.onDownload} />
        </div>
        <div className='ui-g-12 ui-md-1'>
          <Button icon='fa fa-fw fa-trash' type='button' disabled={deleteDisabled} onClick={this.onDelete} />
        </div>
        <div className='ui-g-12 ui-md-1'>
          <Button icon='fa fa-fw fa-code' type='button' disabled={viewDisabled} onClick={this.onViewFile} />
        </div>
        <div className='ui-g-12 ui-md-12'>
          Selected: {selected}
        </div>
        <div className='ui-g-12 ui-md-12'>
          <TreeTable value={data} selectionMode='single' header='History' selectionChange={this.onSelectionChange}>
            <Column field='name' header='Name' sortable />
            <Column field='date' header='Date' sortable style={{textAlign: 'center', width: '40%'}} />
          </TreeTable>
        </div>
      </div>
    )
  }
}
