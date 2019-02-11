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

// TODO: use fileHelper instead of 'fs'
const fs = require('fs')
const protocolNamings = require('../helpers/protocolNamings')

module.exports = (protocol) => {
  protocol = protocolNamings.lowerCaseProtocol(protocol)

  switch (protocol) {
    case 'mqtt': return getMqttTestCases()
    case 'coap': return getCoapTestCases()
    default: return null  // must yield in errors!
  }
}

const getMqttTestCases = () => {
  const filepath = 'backend/resources/testcases/mqtt_testcases.json'
  const data = fs.readFileSync(filepath, 'utf8')

  return JSON.parse(data)
}

const getCoapTestCases = () => {
  const filepath = 'backend/resources/testcases/coap_testcases.json'
  const data = fs.readFileSync(filepath, 'utf8')

  return JSON.parse(data)
}

exports.getMqttTestCases = getMqttTestCases
exports.getCoapTestCases = getCoapTestCases
