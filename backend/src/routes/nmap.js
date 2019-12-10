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
const nmap = require('../nmap/nmap')
const router = express.Router()
const validator = require('../helpers/inputValidator')

module.exports = (socketIO) => {
  /**
   * This route does the checking of inputs coming from the user
   */
  router.use('/scan', function (req, res, next) {
    if (!validator.isValidHost(req.body.target)) {
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
    const target = req.body.target
    const profile = req.body.scanProfile
    const flags = {
      skipHostDiscovery: req.body.skipHostDiscovery
    }

    const [status, nmapEmitter, cmd] = nmap.scan(target, profile, flags)

    if (status) {
      // TODO: response with the socket.io topic you gonna publish to, thus FE does not need to have static topics!
      // eslint-disable-next-line standard/object-curly-even-spacing
      res.status(200).json({reason: cmd})

      /* Define functions to process the events coming from Titan */
      // result event
      nmapEmitter.on('rawLine', (line) => {
        socketIO.sockets.emit('terminal', {'message': 'line', 'value': line})
      })

      nmapEmitter.on('report', report => {
        socketIO.sockets.emit('nmap/report', report)
      })

      // test run finished
      nmapEmitter.on('end', () => {
        nmapEmitter.removeAllListeners()
        socketIO.sockets.emit('nmap/finish', {}) // signal the end of test run to the FE
      })
    } else {
      res.status(500).json({reason: 'nmap failed'})
    }
  })

  return router
}
