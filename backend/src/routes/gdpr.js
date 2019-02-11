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
 * Express Router providing endpoint to retrieve data protection information
 */
const express = require('express')
const router = express.Router()
const gdprReader = require('../helpers/gdprReader')

router.get('/gdpr', function (req, res, next) {
  const data = gdprReader.getGDPRInformation()

  res.status(200).json({'regulation': 'GDPR', 'text': data})
})

module.exports = router
