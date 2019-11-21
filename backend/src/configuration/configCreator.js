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

const fileName = (protocol) => {
  protocol = protocolNamings.lowerCaseProtocol(protocol)
  return protocol + '.cfg'
}

const createConfig = (protocol, sut, data) => {
  const ts = timeStamp()
  const path = pathHelper.storagePath(protocol, ts)

  data.path = path
  const configuration = buildConfig(protocol, sut, data)

  if (configuration) {
    fileHelper.writeFile(configuration, path, fileName(protocol))

    return {valid: true, timestamp: ts, configuration: configuration}
  }
}

const buildConfig = (protocol, sut, data) => {
  protocol = protocolNamings.lowerCaseProtocol(protocol)

  if (protocol && (Object.keys(data).length > 0)) {
    let config
    switch (protocol) {
      case 'mqtt':
        config = mqttConfiguration(sut, data)
        break
      case 'coap':
        config = coapConfiguration(sut, data)
        break
    }
    return config
  }
}

const configUri = (protocol, timestamp) => {
  const configUri = pathHelper.storagePath(protocol, timestamp, fileName(protocol))
  return configUri
}

const configExist = (protocol, timestamp) => {
  return fileHelper.uriExist(configUri(protocol, timestamp))
}

module.exports = {
  buildConfig: buildConfig,
  createConfig: createConfig,
  configUri: configUri,
  configExist: configExist
}
