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
const validator = require('../helpers/inputValidator')

/**
 * Checks the incoming configuration data for <protocol> for invalid values
 * @param protocol
 * @param data is the body payload from e.g a POST request
 * @returns {{valid: boolean, reason: string}}
 */
module.exports = (protocol, data) => {
  protocol = protocolNamings.lowerCaseProtocol(protocol)

  if (!protocol) {
    return {valid: false, reason: 'Requested protocol ' + protocol + ' is invalid'}
  } else if (!Object.keys(data).length > 0) {
    return {valid: false, reason: 'Given input contains no data'}
  } else {
    switch (protocol) {
      case 'mqtt': return mqttConfigInput(data)
      case 'coap': return coapConfigInput(data)
      case 'opc': return opcConfigInput(data)
      default: return {valid: false, reason: 'Requested protocol ' + protocol + ' not implemented'}
    }
  }
}

/**
 * Checks the incoming MQTT configuration data for invalid values
 * @param data
 * @returns {{valid: boolean, reason: string}}
 */
const mqttConfigInput = (data) => {
  if (!data) {
    return {valid: false, reason: 'Data must not be empty'}
  }
  if (!validator.isValidHost(data.host)) {
    return {valid: false, reason: 'Host ' + data.host + ' is invalid'}
  }
  if (!validator.isValidPort(data.port)) {
    return {valid: false, reason: 'Port ' + data.port + ' is invalid'}
  }
  if (!validator.containsNoSpaces(data.username)) {
    return {valid: false, reason: 'Username must not contain spaces'}
  }
  if (validator.isEmpty(data.username)) {
    return {valid: false, reason: 'Username must not be empty'}
  }
  if (!validator.containsNoSpaces(data.password)) {
    return {valid: false, reason: 'Password must not contain spaces'}
  }
  if (validator.isEmpty(data.password)) {
    return {valid: false, reason: 'Password must not be empty'}
  }
  if (!validator.containsNoSpaces(data.clientid)) {
    return {valid: false, reason: 'Client ID must not contain spaces'}
  }
  if (validator.isEmpty(data.clientid)) {
    return {valid: false, reason: 'Client ID must not be empty'}
  }
  if (!validator.containsNoSpaces(data.topic)) {
    return {valid: false, reason: 'Topic must not contain spaces'}
  }
  if (validator.isEmpty(data.topic)) {
    return {valid: false, reason: 'Topic must not be empty'}
  }
  if (data.testcases.length === 0) {
    return {valid: false, reason: 'No test cases selected'}
  }

  return {valid: true, reason: 'All inputs are valid'}
}

/**
 * Checks the incoming CoAP configuration data for invalid values
 * @param data
 * @returns {{valid: boolean, reason: string}}
 */
const coapConfigInput = (data) => {
  if (!data) {
    return {valid: false, reason: 'Data must not be empty'}
  }
  if (!validator.isValidHost(data.host)) {
    return {valid: false, reason: 'Host ' + data.host + ' is invalid'}
  }
  if (!validator.isValidPort(data.port)) {
    return {valid: false, reason: 'Port ' + data.port + ' is invalid'}
  }

  if (data.testcases.length === 0) {
    return {valid: false, reason: 'No test cases selected'}
  }

  // TODO: check resources once implemented
  return {valid: true, reason: 'All inputs are valid'}
}

/**
 * Checks the incoming OPC-UA configuration data for invalid values
 * @param data
 * @returns {{valid: boolean, reason: string}}
 */
const opcConfigInput = (data) => {
  return {valid: false, reason: 'NOT IMPLEMENTED YET'}
}
