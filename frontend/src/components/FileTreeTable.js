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
import {InputTextarea} from 'primereact/inputtextarea'

import { loadHistory, downloadHistoryFile, downloadHistoryFolder, deleteHistoryFolder, readHistoryFile } from '../loaders/HistoryLoader'

export default class FileTreeTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nodes: [],
      expandedKeys: null,
      history: null,
      content: null,
      protocol: null
    }

    this.dataCallback = this.dataCallback.bind(this)
    this.onDownload = this.onDownload.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onViewFile = this.onViewFile.bind(this)
    this.actionTemplate = this.actionTemplate.bind(this)
    this.toggleFolder = this.toggleFolder.bind(this)
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
      this.setState(update(this.state, {expandedKeys: {$set: null}}))
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
    this.setState(update(this.state, {nodes: {$set: data}}))
  }

  /**
   * This method is triggered on press of the download button
   * @param e
   */
  onDownload (e, data) {
    const timestamp = data.timestamp
    const name = data.name

    if (data.type === 'folder') {
      const zipFileName = name + '_' + timestamp + '.zip'
      downloadHistoryFolder(name, timestamp, zipFileName)
    } else if (data.type === 'file') {
      // download a single file
      const proto = data.proto
      downloadHistoryFile(proto, timestamp, name)
    }
  }

  /**
   * This method is triggered on press of the delete button
   * @param e
   */
  onDelete (e, data) {
    const timestamp = data.timestamp
    const name = data.name

    if (data.type === 'folder') {
      // Trigger delete of a complete folder
      deleteHistoryFolder(name, timestamp, (message) => {
        this.growl.show({severity: 'success', summary: 'Deleted', detail: message})
      })

      // load updated history from backend
      loadHistory(this.state.protocol, this.dataCallback)
    } else if (data.type === 'file') {
      this.growl.show({severity: 'failure', summary: 'Deleted', detail: 'cannot delete single files!'})
    }
  }

  onViewFile (e, data) {
    const testsuite = data.testsuite
    const timestamp = data.timestamp
    const fileName = data.name

    readHistoryFile(testsuite, timestamp, fileName, (content) => {
      this.setState(update(this.state, {content: {$set: content}}))
    })
  }

  toggleFolder (e) {
    this.setState(update(this.state, {expandedKeys: {$set: e.value}}))
  }

  actionTemplate (node, column) {
    const data = node.data

    let alternative
    const download = <Button onClick={e => this.onDownload(e, data)} icon='fa fa-fw fa-download' className='p-button-success' style={{marginRight: '.5em'}} />
    if (data.type === 'file') {
      alternative = <Button onClick={e => this.onViewFile(e, data)} icon='fa fa-fw fa-code' />
    } else {
      alternative = <Button onClick={e => this.onDelete(e, data)} icon='fa fa-fw fa-trash' className='p-button-danger' />
    }

    return <div>
      {download}
      {alternative}
    </div>
  }

  render () {
    const dialogVisible = !!(this.state.content)
    const content = (this.state.content) ? this.state.content : <i className='pi pi-spin pi-spinner' style={{'fontSize': '3em'}} />

    return (
      <div>
        <Growl ref={(el) => this.growl = el} />

        <Dialog header={'File Preview'} visible={dialogVisible} onHide={(e) => this.setState(update(this.state, {content: {$set: null}}))}>
          <InputTextarea rows={25} cols={80} value={content} />
        </Dialog>

        <div className='p-col'>
          <TreeTable value={this.state.nodes} onToggle={this.toggleFolder} expandedKeys={this.state.expandedKeys} >
            <Column field='name' header='Name' sortable expander />
            <Column field='date' header='Date' sortable style={{textAlign: 'center', width: '40%'}} />
            <Column body={this.actionTemplate} style={{textAlign: 'center', width: '8em'}} />
          </TreeTable>
        </div>
      </div>
    )
  }
}
