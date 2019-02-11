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

'use strict'

const {spawn} = require('child_process')

// Helpers
const protocolNamings = require('../helpers/protocolNamings')
const pathHelper = require('../helpers/pathHelper')

class TcpDump {
  constructor () {
    this.pid = null
    this.process = null
  }

  start (protocol, timestamp) {
    const file = pathHelper.storagePath(protocol, timestamp, 'tcpdump.pcap')
    this.process = spawn('tcpdump', ['-i', 'any', '-s', '65535', '-w', file])

    if (this.process.pid) {
      this.pid = this.process.pid

      /*
      this.process.on('error', (error) => {
        console.log('>', error)
      })

      this.process.on('exit', () => {
        console.log('>>>> exit')
      }) */
    }
  }

  stop () {
    this.process.kill('SIGINT')
  }
}

module.exports = TcpDump
