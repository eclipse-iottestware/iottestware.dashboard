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
 * Check if the given SUT description is valid and transforms to nice readable string
 * This enables the flexibility of being independent of the concrete notation of a SUT description
 * This notation should always be used when generating Filenames or representations for the frontend
 *
 * @param param is the name of the SUT
 * @returns SUT description as readable notation or null
 */
const readableSUT = (param) => {
  const paramLC = param.toLowerCase()
  let output

  switch (paramLC) {
    case 'server':
    case 'broker':
      output = param
      break
    case 'client':
      output = param
      break
  }

  return output
}

/**
 * Check if the given SUT description is valid and transforms to lowercase string
 * This enables the flexibility of being independent of the concrete notation of a SUT
 * This notation should always be used when generating paths / uris
 *
 * @param param is the name of the SUT
 * @returns SUT name as lowercase notation or null
 */
const lowerCaseSUT = (param) => {
  param = param.toLowerCase()
  let output

  switch (param) {
    case 'server':
    case 'broker':
      output = param
      break
    case 'client':
      output = param
      break
  }

  return output
}

module.exports = {
  readableSUT: readableSUT,
  lowerCaseSUT: lowerCaseSUT
}
