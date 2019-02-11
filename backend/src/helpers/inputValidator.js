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
const validator = require('validator')

/**
 * @description check if the input is a valid Host
 * @param {string} host can be an IP or hostname
 * @return {boolean}
 */
function isValidHost (host) {
  if (validator.isFQDN(host)) {
    return true
  }

  if (validator.isIP(host)) {
    return true
  }

  if (validator.isURL(host)) {
    return true
  }

  if (host === 'localhost') {
    return true
  }

  return false
}

/**
 * @description check if the input is a valid range
 * @param {number} input number to be checked
 * @param {number} min lower bound inclusive
 * @param {number} max upper bound inclusive
 * @return {boolean}
 */
function inRange (input, min, max) {
  if (Number.isInteger(parseInt(input))) {
    return input >= min && input <= max
  } else {
    return false
  }
}

/**
 * @description check if the input is a valid Port number
 * @param {number} port must be an integer in range (1..65535)
 * @return {boolean}
 */
function isValidPort (port) {
  return inRange(port, 1, 65535)
}

/**
 * @description check if the input contains any spaces
 * @param {string} input
 * @return {boolean} true if input contains no spaces
 */
function containsNoSpaces (input) {
  if (/\s+/.test(input)) {
    return false
  } else {
    return true
  }
}

/**
 * @description check if the input is not empty. Useful to check required fields
 * @param input
 */
function isEmpty (input) {
  return (!input)
}

exports.isValidHost = isValidHost
exports.inRange = inRange
exports.isValidPort = isValidPort
exports.containsNoSpaces = containsNoSpaces
exports.isEmpty = isEmpty
