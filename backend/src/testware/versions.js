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

const protocolNamings = require('../helpers/protocolNamings')
const pathHelper = require('../helpers/pathHelper')
const fileHelper = require('../helpers/fileHelper')
const titan = require('./titan')

module.exports = (protocol) => {
  protocol = protocolNamings.lowerCaseProtocol(protocol)

  let content
  switch (protocol) {
    case 'mqtt': {
      content = pathHelper.resourcesPath('testsuites', 'mqtt.json')
      break
    }
    case 'coap': {
      content = pathHelper.resourcesPath('testsuites', 'coap.json')
      break
    }
  }

  if (fileHelper.uriExist(content)) {
    content = fileHelper.readFileSync(content)
    content = JSON.parse(content)
  } else {
    /* Note:
     * 1. in case if backend/resources/testsuites/<protocol>.json does not exist
     * 2. <protocol>.json files are not provided here. Same as the corresponding binaries of the test suites
     * 3. if ran within Docker 'docker build...' should take care create those files (same as the corresponding binaries)
     */
    content = {
      testsuite: {
        name: protocolNamings.readableProtocol(protocol),
        repository: 'None',
        commit: 'None'
      }
    }
  }

  content.ttcn = titan.ttcn3CompilerVersion()
  return content
}
