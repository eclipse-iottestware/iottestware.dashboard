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

const fs = require('fs')
const protocolNamings = require('../helpers/protocolNamings')

module.exports = (protocol, id) => {
  protocol = protocolNamings.lowerCaseProtocol(protocol)

  if (id) {
    switch (protocol) {
      case 'mqtt': return mqttSingleTestPurpose(id)
      case 'coap': return coapSingleTestPurpose(id)
      case 'opc': return opcSingleTestPurpose(id)
      default: return null  // must yield in errors!
    }
  } else {
    switch (protocol) {
      case 'mqtt': return mqttTestPurposes()
      case 'coap': return coapTestPurposes()
      case 'opc': return opcTestPurposes()
      default: return null  // must yield in errors!
    }
  }
}

const mqttTestPurposes = () => {
  // TODO: get path from pathHelper
  const filepath = 'backend/resources/testpurposes/mts_tst_mqtt_broker.json'
  return fromFile(filepath)
}

const mqttSingleTestPurpose = (id) => {
  const tps = mqttTestPurposes()
  return tps[id]
}

const coapTestPurposes = () => {
  const filepath = 'backend/resources/testpurposes/mts_tst_coap_server.json'
  return fromFile(filepath)
}

const coapSingleTestPurpose = (id) => {
  const tps = coapTestPurposes()
  return tps[id]
}

const opcTestPurposes = () => {
  const filepath = 'backend/resources/testpurposes/mts_tst_opcua_server.json'
  return fromFile(filepath)
}

const opcSingleTestPurpose = (id) => {
  const tps = opcTestPurposes()
  return tps[id]
}

const fromFile = (filepath) => {
  // TODO: use fileHelper instead of 'fs'
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'))
  return data.tps
}
