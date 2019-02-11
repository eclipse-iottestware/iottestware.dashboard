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

/** Express router providing tools related routes
 * @module routes/tools
 * @requires express
 */
const express = require('express')
const router = express.Router()

const os = require('os')

const {spawn} = require('child_process')
const validator = require('../helpers/inputValidator')

module.exports = function (io) {
  /**
   * This route does the checking of inputs coming from the user
   */
  router.use('/ping', function (req, res, next) {
    if (!validator.isValidHost(req.body.host)) {
      res.status(500).json({'message': req.body.host + ' is an invalid Host'})
      return
    }

    if (!validator.inRange(req.body.count, 1, 15)) {
      res.status(500).json({'message': 'count must be in range (1..15)'})
      return
    }

    next()
  })

  /**
   * Route executing a Ping Command
   * @name tools/ping
   */
  router.post('/ping', function (req, res, next) {
    let host = req.body.host
    let count = req.body.count

    let params = [host, '-c' + count]

    // check if a specific device was selected and append -S<src IP>
    if (req.body.selectedInterface) {
      params.push('-S' + req.body.selectedInterface.address)
    }
    console.log(params)

    // start Ping command as child process
    let child = spawn('ping', params)

    child.stdout.on('data', (data) => {
      // split data line by line
      let lines = data.toString('utf8').split(/\r?\n/)
      lines.map((line) => {
        io.sockets.emit('terminal', {'message': 'line', 'value': line})
      })
    })

    res.status(200).json({'message': 'Execute Ping Command'})
  })

  /**
   * Route executing a ifconfig command
   * @name tools/ifconfig
   *
   * Note: os.networkInterfaces() does not show all available networks
   * Docker Network i.e. won't be shown
   * https://github.com/nodejs/node/issues/498
   */
  router.get('/ifconfig', function (req, res, next) {
    let interfaces = os.networkInterfaces()
    res.json(interfaces)
  })

  /**
   * Route executing the ValidationAdaptor Tool
   * @name tools/validationAdaptor
   */
  router.post('/validationAdaptor/cfg', function (req, res, next) {
    console.log(req.body.host + ':' + req.body.port + ' -> ')
    let validationAdaptorExec = './backend/bin/ValidationAdaptor.jar'
    let child = spawn('java', ['-jar', validationAdaptorExec])

    child.stdout.on('data', (data) => {
      // split data line by line
      let lines = data.toString('utf8').split(/\r?\n/)
      lines.map((line) => {
        io.sockets.emit('terminal', {'message': 'line', 'value': line})
      })
    })

    res.status(200).json({'message': 'Execute validator Command'})
  })

  router.post('/validationAdaptor/upload', function (req, res, nex) {
    console.log('Backend Upload called! ==> ')

    res.status(200)
  })

  return router
}
