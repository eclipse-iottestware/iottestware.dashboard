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
 * Provides the backend endpoint for requesting historical data for <protocol> from the backend
 * @param protocol
 * @returns {string}
 */
export const historyRequestURI = (protocol) => {
  protocol = (protocol) ? protocol.toLowerCase() : ''
  let endpoint = ''
  switch (protocol) {
    case 'mqtt':
      endpoint = '/v1/history/mqtt'
      break
    case 'coap':
      endpoint = '/v1/history/coap'
      break
    case 'opc':
    case 'opcua':
    case 'opc-ua':
      endpoint = '/v1/history/opc'
      break
    default:
      endpoint = '/v1/history'
  }

  return endpoint
}

/**
 * Provides the backend endpoint for downloading historical data for <protocol> from the backend
 * @param protocol
 * @returns {string}
 */
export const historyDownloadURI = (protocol, timestamp, fileName) => {
  protocol = protocol.toLowerCase()
  const fileId = timestamp + (fileName ? ('/' + fileName) : '')

  let endpoint = ''
  switch (protocol) {
    case 'mqtt':
      endpoint = '/v1/history/download/mqtt/' + fileId
      break
    case 'coap':
      endpoint = '/v1/history/download/coap/' + fileId
      break
    case 'opc':
    case 'opcua':
    case 'opc-ua':
      endpoint = '/v1/history/download/opc/' + fileId
      break
    default:
      endpoint = '/v1/history/download'
  }

  return endpoint
}

export const historyDeleteURI = (protocol, timestamp, fileName) => {
  protocol = protocol.toLowerCase()
  const fileId = timestamp + (fileName ? ('/' + fileName) : '')

  let endpoint = ''
  switch (protocol) {
    case 'mqtt':
      endpoint = '/v1/history/delete/mqtt/' + fileId
      break
    case 'coap':
      endpoint = '/v1/history/delete/coap/' + fileId
      break
    case 'opc':
    case 'opcua':
    case 'opc-ua':
      endpoint = '/v1/history/delete/opc/' + fileId
      break
    default:
      endpoint = '/v1/history/delete'
  }

  return endpoint
}

export const historyReadFileURI = (protocol, timestamp, fileName) => {
  protocol = protocol.toLowerCase()
  const fileId = timestamp + '/' + fileName

  let endpoint = ''
  switch (protocol) {
    case 'mqtt':
      endpoint = '/v1/history/read/mqtt/' + fileId
      break
    case 'coap':
      endpoint = '/v1/history/read/coap/' + fileId
      break
    case 'opc':
    case 'opcua':
    case 'opc-ua':
      endpoint = '/v1/history/read/opc/' + fileId
      break
    default:
      endpoint = '/v1/history/read'
  }

  return endpoint
}

/**
 * Provides the backend endpoint for requesting available testcases for <protocol> from the backend
 * @param protocol
 * @returns {string}
 */
export const testcasesURI = (protocol, sut) => {
  protocol = protocol.toLowerCase()
  sut = sut.toLowerCase()

  const endpoint = '/v1/testcases/' + protocol + '/' + sut

  return endpoint
}

/**
 * Provides the backend endpoint for requesting available testpurposes for <protocol> from the backend
 * @param protocol
 * @returns {string}
 */
export const testpurposesURI = (protocol) => {
  protocol = protocol.toLowerCase()

  let endpoint = ''
  switch (protocol) {
    case 'mqtt':
      endpoint = '/v1/testpurposes/mqtt'
      break
    case 'coap':
      endpoint = '/v1/testpurposes/coap'
      break
    case 'opc':
    case 'opcua':
    case 'opc-ua':
      endpoint = '/v1/testpurposes/opc'
      break
  }

  return endpoint
}

/**
 * Provides the backend endpoint for posting input data for <protocol> which generates the Titan config
 * @param protocol
 * @returns {string}
 */
export const testsuiteConfigURI = (protocol, sut) => {
  protocol = protocol.toLowerCase()

  let endpoint = '/v1/conformance/cfg/' + protocol + '/' + sut

  return endpoint
}

/**
 * Provides the backend endpoint for running a test suite for <protocol> with the configuration with the timestamp
 * @param protocol
 * @param timestamp
 * @returns {string}
 */
export const testsuiteRunURI = (protocol, timestamp) => {
  protocol = protocol.toLowerCase()

  let endpoint = ''
  switch (protocol) {
    case 'mqtt':
      endpoint = '/v1/conformance/run/mqtt/' + timestamp
      break
    case 'coap':
      endpoint = '/v1/conformance/run/coap/' + timestamp
      break
  }

  return endpoint
}

export const testsuiteVersionURI = (protocol) => {
  protocol = (protocol) ? protocol.toLowerCase() : ''

  let endpoint = ''
  switch (protocol) {
    case 'mqtt':
      endpoint = '/v1/conformance/version/mqtt'
      break
    case 'coap':
      endpoint = '/v1/conformance/version/coap'
      break
    default:
      endpoint = '/v1/conformance/version/'
  }

  return endpoint
}

/**
 * Provides the backend endpoint for the evaluation report for <protocol>
 * @param protocol
 * @returns {string}
 */
export const evaluationURI = (protocol) => {
  protocol = protocol.toLowerCase()

  // TODO: CoAP and OPC-UA do not have evaluation reports for now!
  let endpoint = ''
  switch (protocol) {
    case 'mqtt':
      endpoint = '/v1/evaluation/mqtt/mqtt_2018-07-19_15-38-59.json'
      break
    case 'coap':
      endpoint = '/v1/evaluation/coap/coap_2018-10-17_13-07-52.json'
      break
    case 'opc':
    case 'opcua':
    case 'opc-ua':
      endpoint = '/v1/evaluation/opc/opc_sample.json'
      break
  }

  return endpoint
}

export const resourcesURI = (protocol) => {
  if (!protocol) { return '/v1/resources/' }
  protocol = protocol.toLowerCase()

  let endpoint = ''
  switch (protocol) {
    case 'mqtt':
      endpoint = '/v1/resources/mqtt'
      break
    case 'coap':
      endpoint = '/v1/resources/coap'
      break
    case 'opc':
    case 'opcua':
    case 'opc-ua':
      endpoint = '/v1/resources/opc'
      break
  }

  return endpoint
}
