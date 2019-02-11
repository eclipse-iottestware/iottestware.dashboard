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

const fileHelper = require('../helpers/fileHelper')
const pathHelper = require('../helpers/pathHelper')
const protocolNamings = require('../helpers/protocolNamings')
const timeStamp = require('../helpers/timeStamp')
const mqttConfiguration = require('./mqttTemplates')
const coapConfiguration = require('./coapTemplates')

const filePrefixMQTT = 'mqtt'
const fileNameMQTT = filePrefixMQTT + '.cfg'

const filePrefixCoAP = 'coap'
const fileNameCoAP = filePrefixCoAP + '.cfg'

const fileName = (protocol) => {
  protocol = protocolNamings.lowerCaseProtocol(protocol)

  switch (protocol) {
    case 'mqtt': return fileNameMQTT
    case 'coap': return fileNameCoAP
    // case 'opc': return opcConfigInput(data)
    default: return 'unknonw_protocol.cfg'  // must yield in errors!
  }
}

const createConfig = (protocol, data) => {
  protocol = protocolNamings.lowerCaseProtocol(protocol)

  if (!protocol) {
    return {valid: false, reason: 'Requested protocol ' + protocol + ' is invalid'}
  } else if (!Object.keys(data).length > 0) {
    return {valid: false, reason: 'Given input contains no data'}
  } else {
    const ts = timeStamp()

    switch (protocol) {
      case 'mqtt': return createMqttConfig(data, ts)
      case 'coap': return createCoapConfig(data, ts)
      // case 'opc': return opcConfigInput(data)
      default: return {valid: false, reason: 'Requested protocol ' + protocol + ' not implemented'}
    }
  }
}

const createMqttConfig = (data, ts) => {
  const path = pathHelper.storagePath('mqtt', ts)

  data.path = path
  const configuration = mqttConfiguration(data)
  fileHelper.writeFile(configuration, path, fileNameMQTT)

  return {valid: true, timestamp: ts}
}

const createCoapConfig = (data, ts) => {
  const path = pathHelper.storagePath('coap', ts)

  data.path = path
  const configuration = coapConfiguration(data)
  fileHelper.writeFile(configuration, path, fileNameCoAP)

  return {valid: true, timestamp: ts}
}

const configUri = (protocol, timestamp) => {
  const configUri = pathHelper.storagePath(protocol, timestamp, fileName(protocol))
  return configUri
}

const configExist = (protocol, timestamp) => {
  return fileHelper.uriExist(configUri(protocol, timestamp))
}

module.exports = {
  createConfig: createConfig,
  configUri: configUri,
  configExist: configExist
}
