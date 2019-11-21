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
const sutChoice = require('../helpers/sutChoice')

module.exports = (protocol, sut) => {
  protocol = protocolNamings.lowerCaseProtocol(protocol)
  sut = sutChoice.lowerCaseSUT(sut)

  switch (protocol) {
    case 'mqtt': return getMqttTestCases(sut)
    case 'coap': return getCoapTestCases(sut)
    default: return null  // must yield in errors!
  }
}

const getMqttTestCases = (sut) => {
  let filepath

  if (sut === 'broker') {
    filepath = 'backend/resources/testcases/mqtt_broker_testcases.json'
  } else if (sut === 'client') {
    filepath = 'backend/resources/testcases/mqtt_client_testcases.json'
  }

  if (filepath) {
    const data = fs.readFileSync(filepath, 'utf8')
    return JSON.parse(data)
  } else {
    return JSON.parse('{}') // empty JSON
  }
}

const getCoapTestCases = (sut) => {
  let filepath

  if (sut === 'server') {
    filepath = 'backend/resources/testcases/coap_server_testcases.json'
  } else if (sut === 'client') {
    filepath = 'backend/resources/testcases/coap_client_testcases.json'
  }

  if (filepath) {
    const data = fs.readFileSync(filepath, 'utf8')
    return JSON.parse(data)
  } else {
    return JSON.parse('{}') // empty JSON
  }
}

exports.getMqttTestCases = getMqttTestCases
exports.getCoapTestCases = getCoapTestCases
