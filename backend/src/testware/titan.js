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

const {spawn, spawnSync} = require('child_process')
const testsuites = require('./testsuites')
const configurations = require('../configuration/configCreator')

const EventEmitter = require('events')
class TitanEmitter extends EventEmitter {}
const titanEmitter = new TitanEmitter()
const lineChecker = require('./lineChecker')

const pathHelper = require('../helpers/pathHelper')
const fileHelper = require('../helpers/fileHelper')

const ttcn3Start = (protocol, timestamp) => {
  const testsuite = testsuites(protocol)
  const configurarion = configurations.configUri(protocol, timestamp)
  const loggingPath = pathHelper.storagePath(protocol, timestamp)
  let ttyLog = ''
  let resultsLog = []

  const process = spawn('ttcn3_start', [testsuite, configurarion])

  process.on('error', (error) => {
    //titanEmitter.emit('error', error)
    console.error('Error from child process: ' + error)
  })

  process.on('exit', () => {
    titanEmitter.emit('exit')
  })

  process.stdout.on('data', (data) => {
    ttyLog += data
    // split data line by line
    const lines = data.toString('utf8').split(/\r?\n/)
    lines.map((line) => {
      if (lineChecker.readAndCheckLine(line, 'tty')) {
        const result = lineChecker.readAndCheckLine(line, 'tty')

        resultsLog.push(result)

        titanEmitter.emit('result', result)
      }
    })
  })

  process.stdout.on('end', () => {
    // write tty log and the results
    if (ttyLog !== '') { fileHelper.writeFile(ttyLog, loggingPath, 'tty_output.log') }
    if (resultsLog.length > 0) { fileHelper.writeFile(JSON.stringify(resultsLog, null, 4), loggingPath, 'results_output.json') }

    titanEmitter.emit('end')
  })

  if (process.pid) {
    return [true, titanEmitter]
  } else {
    return [false, process]
  }
}

const ttcn3CompilerVersion = () => {
  const process = spawnSync('ttcn3_compiler', ['-v'])
  let version = {}

  // check if ttcn3_compiler is present and the output
  if (process.output) {
    const stdout = process.output.toString()

    // TODO: use regex as in lineChecker
    const tokens = stdout.split('\n')
    version = {
      product: tokens[1].split(':')[1].trim(),      // Product number: CRL 113 200/6 R4A
      build_date: tokens[2].split(': ')[1].trim(),  // Build date: Jun 12 2018 08:36:32
      compiler: tokens[3].split(':')[1].trim()      // Compiled with: GCC 7.3.0
    }
  } else {
    version = {
      product: 'No TTCN-3 avialable',
      build_date: 'None',
      compiler: 'None'
    }
  }

  return version
}

module.exports = {
  ttcn3Start: ttcn3Start,
  ttcn3CompilerVersion: ttcn3CompilerVersion
}
