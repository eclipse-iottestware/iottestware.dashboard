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
 * Express.js router providing routes related to resources
 */
const express = require('express')
const router = express.Router()

// Helpers
const protocolNamings = require('../helpers/protocolNamings')
const resourceReader = require('../helpers/resourcesReader')

/**
 * Request to get all resources for all protocols
 */
router.get('/', (req, res) => {
  let links = resourceReader('all')

  res.status(200).json(JSON.parse(links))
})

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
 * Request to get all resources for <protocol>
 */
router.get('/:protocol', (req, res) => {
  const protocol = protocolNamings.lowerCaseProtocol(req.params.protocol)
  const resources = resourceReader(protocol)

  res.status(200).json(resources)
})

module.exports = router
