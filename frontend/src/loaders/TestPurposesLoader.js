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

import { testpurposesURI } from '../utils/BackendEndpoints'

export const loadTestPurposes = (protocol, callback) => {
  const endpoint = testpurposesURI(protocol)

  fetch(endpoint, {method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
    .then(async response => {
      if (response.status !== 200) {
        const errorMessage = await response.json()
        throw errorMessage
      }

      return response.json()
    }).then(payload => {
      callback(payload)
    }).catch(error => {
      const empty = []
      callback(empty, error)
    })
}
