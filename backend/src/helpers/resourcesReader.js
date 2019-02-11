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

// TODO: use fileHelper instead of 'fs'
const fs = require('fs')
// const fileHelper = require('./fileHelper')
const pathHelper = require('./pathHelper')
const protocolNamings = require('./protocolNamings')

module.exports = (selection) => {
  const protocol = protocolNamings.lowerCaseProtocol(selection)

  switch (protocol) {
    case 'mqtt': return getMqttResources()
    case 'coap': return getCoapResources()
    case 'opc': return getOpcResources()
    // default: return null  // must yield in errors!
  }

  // Fixme
  if (selection) {
    if (selection === 'all') {
      return getAllResources()
    }
  }
}

const getMqttResources = () => {
  const filename = 'mqtt_content.json'
  const data = fromFile(filename)

  return JSON.parse(data)
}

const getCoapResources = () => {
  const filename = 'coap_content.json'
  const data = fromFile(filename)

  return JSON.parse(data)
}

const getOpcResources = () => {
  const filename = 'opc_content.json'
  const data = fromFile(filename)

  return JSON.parse(data)
}

const getAllResources = () => {
  const mqtt = getMqttResources()
  const coap = getCoapResources()
  const opc = getOpcResources()

  const all = extend(coap, mqtt, opc)

  // console.log('\n########')
  // console.log(all)
  const jsonAll = JSON.stringify(all)
  // console.log('########')
  return jsonAll
}

// Fixme: https://stackoverflow.com/questions/14974864/combine-or-merge-json-on-node-js-without-jquery
function extend (target) {
  var sources = [].slice.call(arguments, 1)
  sources.forEach(function (source) {
    for (var prop in source) {
      target[prop] = source[prop]
    }
  })
  return target
}

const fromFile = (filename) => {
  const filepath = pathHelper.resourcesPath('content', filename)
  let data = fs.readFileSync(filepath, 'utf8')

  // Fixme
  if (!data) {
    data = {}
  }

  return data
}

// exports.getMqttResources = getMqttResources
// exports.getCoapResources = getCoapResources
// exports.getOpcResources = getOpcResources
