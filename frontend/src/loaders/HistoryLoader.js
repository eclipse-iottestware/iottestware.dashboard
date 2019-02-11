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

import { historyDownloadURI, historyRequestURI, historyDeleteURI, historyReadFileURI } from '../utils/BackendEndpoints'
import FileSaver from 'file-saver'

export const loadHistory = (protocol, callback) => {
  const endpoint = historyRequestURI(protocol)

  fetch(endpoint, {method: 'GET'})
    .then(async response => {
      if (response.status !== 200) {
        const errorMessage = await response.json()
        throw errorMessage
      }
      return response.json()
    })
    .then(historyData => {
      let treeData = []
      let trs = historyData.testruns.sort((a, b) => b.id - a.id)  // sort the data by id (timestamp)
      trs.forEach(item => {
        const date = new Date(item.id * 1000).toLocaleString()

        let elementChildren = []
        item.files.forEach(file => {
          const child = {
            'data': {
              'key': item.id + '_' + file,
              'date': date,
              'timestamp': item.id,
              'name': file,
              'parent': item.protocol
            }
          }
          elementChildren.push(child)
        })

        const element = {
          'data': {
            'key': item.id,
            'date': date,
            'timestamp': item.id,
            'name': item.protocol
          },
          'children': elementChildren
        }
        treeData.push(element)
      })

      callback(treeData)
    }).catch(error => {
      const emptyTreeData = []
      callback(emptyTreeData, error)
    })
}

/**
 * Download one single historical file
 * @param protocol
 * @param timestamp
 * @param fileName
 */
export const downloadHistoryFile = (protocol, timestamp, fileName) => {
  const endpoint = historyDownloadURI(protocol, timestamp, fileName)
  downloadHistory(endpoint, fileName)
}

/**
 * Download the whole folder and apply the fileId for the received .zip file
 * @param protocol
 * @param timestamp
 * @param fileName
 */
export const downloadHistoryFolder = (protocol, timestamp, fileName) => {
  const endpoint = historyDownloadURI(protocol, timestamp, null)
  downloadHistory(endpoint, fileName)
}

const downloadHistory = (endpoint, fileName) => {
  fetch(endpoint, {method: 'GET'})
    .then(async response => {
      if (response.status !== 200) {
        const errorMessage = await response.json()
        throw errorMessage
      }
      return response.blob()
    }).then(data => {
      FileSaver.saveAs(data, fileName)
    }).catch(error => {
      this.growl.show({severity: 'error', summary: 'Failure', detail: error.message})
    })
}

export const deleteHistoryFolder = (protocol, timestamp, callback) => {
  const endpoint = historyDeleteURI(protocol, timestamp, null)

  fetch(endpoint, {method: 'DELETE'})
    .then(async response => {
      if (response.status !== 200) {
        const errorMessage = await response.json()
        throw errorMessage
      }
      return response.json()
    }).then(data => {
      callback(data.message)
    }).catch(error => {
      console.error('ERROR: ' + error)
    })
}

export const readHistoryFile = (protocol, timestamp, fileName, callback) => {
  const endpoint = historyReadFileURI(protocol, timestamp, fileName)

  fetch(endpoint, {method: 'GET'})
    .then(async response => {
      if (response.status !== 200) {
        const errorMessage = await response.json()
        throw errorMessage
      }
      return response.json()
    }).then(data => {
    callback(data.content)
  }).catch(error => {
    console.error('ERROR: ' + error)
  })
}
