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

const express = require('express')
const router = express.Router()
const {spawn} = require('child_process')
const validator = require('../helpers/inputValidator')

module.exports = function (io) {
  /**
   * This route does the checking of inputs coming from the user
   */
  router.use('/scan', function (req, res, next) {
    if (!validator.isValidHost(req.body.host)) {
      res.status(500).json({'message': 'Invalid Host'})
      return
    }

    next()
  })

  /**
   * Route executing a Nmap Command
   * @name ToolsMenuModel/nmap
   */
  router.post('/scan', function (req, res, next) {
    let host = req.body.host

    let child = spawn('nmap', [host, '-v', '-A'])

    child.stdout.on('data', (data) => {
      // split data line by line
      let lines = data.toString('utf8').split(/\r?\n/)
      lines.map((line) => {
        io.sockets.emit('terminal', {'message': 'line', 'value': line})
      })
    })

    res.status(200).json({'message': 'Execute Nmap Command'})
  })

  return router
}
