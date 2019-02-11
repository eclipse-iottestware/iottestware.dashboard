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

/**
 *
 */
const express = require('express')
const fs = require('fs')
const router = express.Router()
const path = require('path')
const fileHelper = require('../helpers/fileHelper')
const pathHelper = require('../helpers/pathHelper')
const timeStamp = require('../helpers/timeStamp')

const ipkValidator = require('../validationAdapter/ipkAdaptor')
const TcpDump = require('../tcpdump/tcpdump')

const filePrefix = 'opc'
const configFileName = filePrefix + '_config.xml'

// const cfgPath = path.join(__dirname, '../tmp/')
const validatorPath = path.resolve(__dirname, '../../bin/')

module.exports = (socketIO) => {
  router.use('/upload', (req, res, next) => {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.')
    } else {
      next()
    }
  })

  router.post('/upload', (req, res) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let configuration = req.files.configuration

    let timestamp = timeStamp()
    let filename = configFileName
    let destination = pathHelper.storagePath('opc', timestamp)
    const fileURI = pathHelper.storagePath('opc', timestamp, filename)

    fileHelper.mkdirSync(destination)

    // Use the mv() method to place the file somewhere on your server
    configuration.mv(fileURI, (err) => {
      if (err) {
        return res.status(500).send(err)
      }

      res.status(200).json({'id': timestamp})
    })
  })

  /**
   * Check if the given file exists on local drive
   */
  router.use('/run/:timestamp', (req, res, next) => {
    const ts = req.params.timestamp
    const cfgUri = pathHelper.storagePath('opc', ts, configFileName)
    const ret = fileHelper.uriExist(cfgUri)

    if (ret) {
      next()
    } else {
      res.status(404)
        .json(
          {'message': 'Given configuration ' + ts + ' does not exist'})
    }
  })

  router.get('/run/:timestamp', (req, res) => {
    const timestamp = req.params.timestamp

    const [status, emitter] = ipkValidator.start(timestamp)

    if (status) {
      const tcpDump = new TcpDump()
      tcpDump.start('opc', timestamp)

      /* // Note: ipkValidator does not send any data for now!
      emitter.on('result', (data) => {
        console.log('RESULT: ' + data)
      }) */

      emitter.on('error', (error) => {
        console.error('IPK Adaptor error ' + error)
      })

      // When IPK Adaptor finished, copy the log file and signalise to FE
      emitter.on('end', () => {
        emitter.removeAllListeners()
        socketIO.sockets.emit('ipkValidator/finish', {}) // signal the end of test run to the FE
        tcpDump.stop()
      })

      res.status(200).json({reason: 'running ValidationAdaptor for ' + timestamp})
    } else {
      res.status(500).json({reason: 'ValidationAdaptor.jar failed'})
    }
  })

  /*
  router.get('/log/:cfg_name', async function (req, res, next) {
    const filename = req.params.cfg_name
    const filepath = path.join(cfgPath, '/logs/')
    const fileUri = path.join(filepath, filename)

    if (fileHelper.uriExist(fileUri)) {
      const data = fs.readFileSync(fileUri, 'utf8')

      res.status(200).json({'message': 'XML Content needs to be translated first'})
    } else {
      res.status(404).json({'message': 'File ' + filename + ' does not exist'})
    }
  }) */

  return router
}
