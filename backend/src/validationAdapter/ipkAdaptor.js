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

const {spawn} = require('child_process')
const process = require('process')

const EventEmitter = require('events')
class AdaptorEmitter extends EventEmitter {}
const adaptorEmitter = new AdaptorEmitter()

const binary = 'ValidationAdaptor.jar'
// const headlessParam = '-Djava.awt.headless=true'

const pathHelper = require('../helpers/pathHelper')
const fileHelper = require('../helpers/fileHelper')

const start = (timestamp) => {
  const args = ['-jar', binary]

  if (!prepareConfig(timestamp)) {
    return [false]
  }

  // change directory: Config.xml is bound relativ to ValidationAdaptor.jar
  const binaryPath = pathHelper.binariesPath('')
  process.chdir(binaryPath)

  const adaptorProcess = spawn('java', args)

  adaptorProcess.on('error', (error) => {
    adaptorEmitter.emit('error', error)
  })

  adaptorProcess.stdout.on('data', (data) => {
    adaptorEmitter.emit('data', data)
  })

  adaptorProcess.stdout.on('end', () => {
    adaptorEmitter.emit('end')
    saveLog(timestamp)  // copy the generated log.xml to timestamped folder
  })

  if (adaptorProcess.pid) {
    return [true, adaptorEmitter]
  } else {
    return [false, adaptorProcess]
  }
}

const path = require('path')
const validatorPath = path.resolve(__dirname, '../../bin/')
const filePrefix = 'opc'
const configFileName = filePrefix + '_config.xml'

const prepareConfig = (timestamp) => {
  const cfgUri = pathHelper.storagePath('opc', timestamp, configFileName)

  if (fileHelper.uriExist(cfgUri)) {
    const destCfg = path.resolve(validatorPath, 'Config.xml')
    const destLog = path.resolve(validatorPath, 'log.xml')

    fileHelper.fileDelete(destCfg)
    fileHelper.fileDelete(destLog)
    fileHelper.fileCopy(cfgUri, destCfg)

    return true
  } else {
    return false
  }
}

const saveLog = (timestamp) => {
  const destLog = pathHelper.storagePath('opc', timestamp, 'opc_log.xml')
  const srcLog = path.resolve(validatorPath, 'log.xml')
  const srcConf = path.resolve(validatorPath, 'Config.xml')

  fileHelper.fileCopy(srcLog, destLog)  // copy the log file to timestamped folder
  fileHelper.fileDelete(srcLog)         // remove the log.xml from binary folder
  fileHelper.fileDelete(srcConf)        // remove the Config.xml from binary folder
}

module.exports = {
  start: start
}
