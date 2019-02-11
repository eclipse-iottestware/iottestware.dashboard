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

/** Express router providing Reporting related routes
 * @module routes/report
 * @requires express
 */
const pdfMake = require('pdfmake')
const express = require('express')
const router = express.Router()
const Report = require('../report/Report')
const Section = require('../report/Section')
const TestResult = require('../report/TestResultTable')

router.get('/mqtt', function (req, res, next) {
  let report = new Report('someDemoID')

  // create some Demo Test Results
  let results = [
    new TestResult('pass'), new TestResult('inconc'), new TestResult('fail')
  ]

  // create some Demo Sections
  let sections = [
    {title: 'References', content: 'Add here your references to required documents e.g. Test Purposes in TDL-TO'},
    {title: 'Test Run: MQTT', content: results.map(tr => tr.render())},
    {title: 'Test Run: Security', content: 'Security Report'}
  ]

  sections.forEach(s => report.appendSection(new Section(s.title, s.content)))

  let printer = new pdfMake(report.getFonts())
  let doc = printer.createPdfKitDocument(report.render())

  let chunks = []
  let result

  doc.on('data', function (chunk) {
    chunks.push(chunk)
  })

  doc.on('end', function () {
    result = Buffer.concat(chunks)

    res.contentType('application/pdf')
    res.send(result)
  })

  doc.end()
})

router.get('/coap', function (req, res, next) {
  let report = new Report('someDemoID')

  // create some Demo Test Results
  let results = [
    new TestResult('pass'), new TestResult('inconc'), new TestResult('fail')
  ]

  // create some Demo Sections
  let sections = [
    {title: 'References', content: 'Add here your references to required documents e.g. Test Purposes in TDL-TO'},
    {title: 'Test Run: CoAP', content: results.map(tr => tr.render())},
    {title: 'Test Run: Security', content: 'Security Report'}
  ]

  sections.forEach(s => report.appendSection(new Section(s.title, s.content)))

  let printer = new pdfMake(report.getFonts())
  let doc = printer.createPdfKitDocument(report.render())

  let chunks = []
  let result

  doc.on('data', function (chunk) {
    chunks.push(chunk)
  })

  doc.on('end', function () {
    result = Buffer.concat(chunks)

    res.contentType('application/pdf')
    res.send(result)
  })

  doc.end()
})

router.get('/opcua', function (req, res, next) {
  let report = new Report('someDemoID')

  // create some Demo Test Results
  let results = [
    new TestResult('pass'), new TestResult('inconc'), new TestResult('fail'),
    new TestResult('pass'), new TestResult('inconc'), new TestResult('fail')
  ]

  // create some Demo Sections
  let sections = [
    {title: 'References', content: 'Add here your references to required documents e.g. Test Purposes in TDL-TO'},
    {title: 'Test Run: OPC-UA', content: results.map(tr => tr.render())},
    {title: 'Test Run: Security', content: 'Security Report'}
  ]

  sections.forEach(s => report.appendSection(new Section(s.title, s.content)))

  let printer = new pdfMake(report.getFonts())
  let doc = printer.createPdfKitDocument(report.render())

  let chunks = []
  let result

  doc.on('data', function (chunk) {
    chunks.push(chunk)
  })

  doc.on('end', function () {
    result = Buffer.concat(chunks)

    res.contentType('application/pdf')
    res.send(result)
  })

  doc.end()
})

module.exports = router
