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
 * Express.js router providing routes related to conformance tests suites
 *
 * Test suites:
 * - MQTT
 * - CoAP
 * - OPC-UA
 */
const express = require('express')
const router = express.Router()

// Helpers
const protocolNamings = require('../helpers/protocolNamings')
const validator = require('../configuration/configInputValidator')
const configuration = require('../configuration/configCreator')
const testPurposes = require('../testware/testpurposesReader')
const titan = require('../testware/titan')
const testwareVersions = require('../testware/versions')
const TcpDump = require('../tcpdump/tcpdump')

// Reporting
const Report = require('../report/Report')

module.exports = (socketIO) => {
  /**
   * First check if all inputs are given and valid
   */
  router.use('/cfg/:protocol', (req, res, next) => {
    const check = validator(req.params.protocol, req.body)

    if (!check.valid) {
      res.status(500).json(check)
    } else {
      next()
    }
  })

  /**
   * After validation proceed with building the configuration file
   */
  router.post('/cfg/:protocol', (req, res) => {
    const protocol = protocolNamings.lowerCaseProtocol(req.params.protocol)
    const ret = configuration.createConfig(protocol, req.body)

    if (ret.valid) {
      res.status(200).json(ret)
    } else {
      res.status(500).json(ret)
    }
  })

  /**
   * Give the version (respectively the git commit) of the used Test suite and Titan
   */
  router.use('/version/:protocol', (req, res, next) => {
    const protocol = protocolNamings.lowerCaseProtocol(req.params.protocol)

    if (protocol) {
      next()
    } else {
      // Note: the json response exists already in '../configuration/configInputValidator.js'
      // TODO: separate and unify the responses and response statuses for status != 200
      res.status(404).json({valid: false, reason: 'Requested protocol ' + req.params.protocol + ' is invalid'})
    }
  })

  router.get('/version/:protocol', (req, res) => {
    const protocol = protocolNamings.lowerCaseProtocol(req.params.protocol)
    const version = testwareVersions(protocol)

    res.status(200).json(version)
  })

  /**
   * First check if the requested file exists on local drive
   */
  router.use('/run/:protocol/:timestamp', (req, res, next) => {
    const timestamp = req.params.timestamp
    const protocol = protocolNamings.lowerCaseProtocol(req.params.protocol)

    if (configuration.configExist(protocol, timestamp)) {
      next()
    } else {
      res.status(404).json({reason: 'Requested configuration does not exist'})
    }
  })

  /**
   * Starts the <protocol> Test Suite with the given configuration
   */
  router.get('/run/:protocol/:timestamp', (req, res) => {
    const timestamp = req.params.timestamp
    const protocol = protocolNamings.lowerCaseProtocol(req.params.protocol)

    const [status, emitter] = titan.ttcn3Start(protocol, timestamp)

    // if status is true, the nodejs titan wrapper was able to start ttcn3_start and has PID for the process
    if (status) {
      // TODO: response with the socket.io topic you gonna publish to, thus FE does not need to have static topics!
      res.status(200).json({reason: 'running ' + protocol + ' ' + timestamp})

      // prepare tcp dump
      const tcpDump = new TcpDump()
      tcpDump.start(protocol, timestamp)

      // prepare the report object
      const report = new Report('Test Report ' + protocolNamings.readableProtocol(protocol) + ' ' + timestamp)

      // store tps here to avoid multiple reading from .json file
      const tps = testPurposes(protocol)

      report.appendSection('Test Run ' + protocolNamings.readableProtocol(protocol))

      /* Define functions to process the events coming from Titan */
      // result event
      emitter.on('result', (data) => {
        socketIO.sockets.emit('testresults', data)

        let tp = testPurpose(protocol, data.testcase, tps)

        report.appendToSection(data, tp)
      })

      // test run finished
      emitter.on('end', () => {
        emitter.removeAllListeners()
        socketIO.sockets.emit('testresults/finish', {}) // signal the end of test run to the FE
        report.save(protocol, timestamp)
        tcpDump.stop()
      })
    } else {
      res.status(500).json({reason: 'ttcn3_start failed'})
    }
  })

  return router
}

const testPurpose = (protocol, testcase, tps) => {
  let tp = tps[testcase.replace('TC_', 'TP_')]

  // Note: is required if TC could not be mapped to TP
  if (!tp) {
    tp = {
      'id':
        'NO TP FOUND',
      'objective':
        'NO TP FOUND',
      'reference':
        'NO TP FOUND',
      'PICS':
      [
        'NO TP FOUND'
      ],
      'init':
        'NO TP FOUND',
      'expected':
        'NO TP FOUND'
    }
  }

  return tp
}
