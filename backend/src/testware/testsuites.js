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

module.exports = (protocol) => {
  protocol = protocolNamings.lowerCaseProtocol(protocol)

  switch (protocol) {
    case 'mqtt': return pathHelper.binariesPath('iottestware.mqtt')
    case 'coap': return pathHelper.binariesPath('iottestware.coap')
    default: return null  // must yield in errors!
  }
}
