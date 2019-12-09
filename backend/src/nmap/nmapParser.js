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
const regStart = /Starting Nmap ([0-9]+\.[0-9]+) \(.*\) at (.*)/
const regScanReport = /Nmap scan report for\s(.*)/
const regLatency = /Host is up \(([0-9]+\.[0-9]+)s latency\)/
const regFilteredPorts = /Not shown: ([0-9]+) filtered ports/
const regScannedPorts = /([0-9]+)\/(tcp|udp)\s+(open|closed)\s+([A-Za-z0-9_\-?]+)[\s+(.*)+]?/
const regDone = /Nmap done: ([0-9]+) IP address(es)? \(([0-9]+) host[s]? up\) scanned in ([0-9]+\.[0-9]+) seconds/

const checkReport = (report) => {
  if (typeof report === 'undefined' || !report) {
    return false
  }
  return true
}

const isBlank = (str) => {
  return (!str || /^\s*$/.test(str))
}

const isEmpty = (str) => {
  return (str.length === 0 || !str.trim())
}

const parse = (input, report) => {
  let done = false

  input.split(/\r?\n/).forEach(line => {
    if (isBlank(line) || isEmpty(line)) {
      return [done, report]
    } else {
      [done, report] = parseLine(line, report)
    }
  })

  return [done, report]
}

// function to filter parse nmap results from  String 'line'
const parseLine = (line, report) => {
  let done = false

  if (regStart.test(line)) {
    if (!checkReport(report)) {
      report = {
        hosts: []
      }
    }
    const g = line.match(regStart)
    report['nmap'] = g[1]
    report['start'] = g[2]
  } else if (regScanReport.test(line)) {
    const g = line.match(regScanReport)
    report['hosts'].push({'host': g[1], 'ports': []})
  } else if (regLatency.test(line)) {
    const g = line.match(regLatency)
    const lastTarget = report['hosts'].slice(-1)[0]
    lastTarget['latency'] = g[1]
  } else if (regFilteredPorts.test(line)) {
    const g = line.match(regFilteredPorts)
    const lastTarget = report['hosts'].slice(-1)[0]
    lastTarget['filtered_ports'] = g[1]
  } else if (regScannedPorts.test(line)) {
    const g = line.match(regScannedPorts)
    const lastTarget = report['hosts'].slice(-1)[0]
    lastTarget['ports'].push({'port': g[1], 'transport': g[2], 'state': g[3], 'service': g[4], 'version': g[5]})
  } else if (regDone.test(line)) {
    const g = line.match(regDone)
    report['scanned'] = g[1] // scanned IP addresses
    report['up'] = g[3] // found online hosts
    report['duration'] = g[4] // duration of the scan
    done = true // SCAN DONE
  } else {
    // simply skip this line
    //console.log('/-> ' + line)
  }

  return [done, report]
}

module.exports = {
  parse: parse
}
