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
      let folderItems = []
      let trs = historyData.testruns.sort((a, b) => b.id - a.id)  // sort the data by id (timestamp)
      trs.forEach(folder => {
        const date = new Date(folder.id * 1000).toLocaleString()

        let files = []
        folder.files.forEach(f => {
          const fileItem = {
            'key': folder.id + '_' + f,
            'data': {
              'name': f,
              'date': date,
              'timestamp': folder.id,
              'type': 'file',
              'testsuite': folder.testsuite
            }
          }
          files.push(fileItem)
        })

        const folderItem = {
          'key': folder.testsuite + '_' + folder.id,
          'data': {
            'name': folder.testsuite,
            'date': date,
            'timestamp': folder.id,
            'type': 'folder'
          },
          'children': files
        }

        folderItems.push(folderItem)
      })

      callback(folderItems)
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
      // this.growl.show({severity: 'error', summary: 'Failure', detail: error.message})
      return error
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

export const readHistoryFile = (testsuite, timestamp, fileName, callback) => {
  const endpoint = historyReadFileURI(testsuite, timestamp, fileName)

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
