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
 * Express.js router providing routes related to test purposes
 */
const express = require('express')
const router = express.Router()

// Helpers
const protocolNamings = require('../helpers/protocolNamings')
const tpreader = require('../testware/testpurposesReader')

/**
 * First check if the requested protocol is valid
 */
router.use('/:protocol', (req, res, next) => {
  const protocol = protocolNamings.lowerCaseProtocol(req.params.protocol)

  if (protocol) {
    next()
  } else {
    res.status(500).json({reason: 'Requested protocol ' + protocol + ' is not supported'})
  }
})

/**
 * Request to get all test purposes for <protocol>
 */
router.get('/:protocol', (req, res) => {
  const protocol = protocolNamings.lowerCaseProtocol(req.params.protocol)
  const tps = tpreader(protocol)

  if (tps) {
    res.status(200).json(tps)
  } else {
    res.status(404).json({reason: protocol + ' does not contain TPs'})
  }
})

/**
 * First check if the requested protocol and the Tp ID are valid
 */
router.use('/:protocol/:tpID', (req, res, next) => {
  const protocol = protocolNamings.lowerCaseProtocol(req.params.protocol)

  if (protocol) {
    next()
  } else {
    res.status(500).json({reason: 'Requested protocol ' + protocol + ' is not supported'})
  }
})

/**
 * Request to get the test purpose with <tpID> for <protocol>
 */
router.get('/:protocol/:tpID', (req, res) => {
  const protocol = protocolNamings.lowerCaseProtocol(req.params.protocol)
  const tpID = req.params.tpID

  // TODO:
  res.status(500)
})

module.exports = router
