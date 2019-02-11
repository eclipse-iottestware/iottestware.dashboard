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

function getGDPRInformation () {
  const filePath = 'backend/resources/gdpr/gdpr-info.txt'
  const data = fs.readFileSync(filePath, 'utf8')

  return data
}

exports.getGDPRInformation = getGDPRInformation
