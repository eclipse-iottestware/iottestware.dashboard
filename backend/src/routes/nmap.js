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
const fileHelper = require('../helpers/fileHelper')
const pathHelper = require('../helpers/pathHelper')
const timeStamp = require('../helpers/timeStamp')
const router = express.Router()
const {spawn} = require('child_process')
const validator = require('../helpers/inputValidator')

module.exports = function (io) {
  /**
   * This route does the checking of inputs coming from the user
   */
  router.use('/scan', function (req, res, next) {
    if (!validator.isValidHost(req.body.target)) {
      console.log('INVALID HOST!')
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
    const parameters = params(target, profile, timeStamp())
    let child = spawn('nmap', parameters)

    child.stdout.on('data', (data) => {
      // split data line by line
      let lines = data.toString().split(/\r?\n/)
      lines.map((line) => {
        // TODO: parse the lines here and build summary
        io.sockets.emit('terminal', {'message': 'line', 'value': line})
      })
    })

    child.stderr.on('data', (data) => {
      io.sockets.emit('terminal', {'message': 'error', 'value': data})
    })

    res.status(200).json({'message': 'nmap' + parameters})
  })

  return router
}

const params = (target, profile, timestamp) => {
  fileHelper.mkdirSync(pathHelper.storagePath('nmap', timestamp))
  const outputFile = pathHelper.storagePath('nmap', timestamp, 'nmap_scan')

  let p = ['-oA', outputFile]
  if (profile === 'ping_scan') {
    p.push('-sn', '-Pn', target)
  } else if (profile === 'quick_scan') {
    p.push('-T4', '-F', target)
  // Quick Scan+ / traceroute require root privileges
  // } else if (profile === 'quick_scan_plus') {
  //  p.push('-sV', '-T4', '-O', '-F', '--version-light', target)
  // } else if (profile === 'quick_traceroute') {
  //  p.push('-sn', '-traceroute', target)
  } else if (profile === 'intense_scan') {
    p.push('-T4', '-A', '-v', target)
  // UDP scan requires root privileges https://www.unix.com/ip-networking/248432-why-nmap-udp-need-root.html
  // } else if (profile === 'intense_scan_udp') {
  //  p.push('-sS', '-sU', '-T4', '-A', '-v', target)
  } else if (profile === 'intense_scan_all_tcp') {
    p.push('-p 1-65535', '-T4', '-A', '-v', target)
  } else if (profile === 'intense_scan_no_ping') {
    p.push('-T4', '-A', '-v', '-Pn', target)
  } else {
    // perform a regular scan
    p.push(target)
  }

  return p
}
