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
'use strict'

const TitlePage = require('./TitlePage')
const Section = require('./Section')
const Styles = require('./ReportStyles')
const HeaderFooter = require('./HeaderFooter')
const TestResultTable = require('./TestResultTable')
const TOC = require('./TOC')

const pathHelper = require('../helpers/pathHelper')
const fileHelper = require('../helpers/fileHelper')

const PDFMake = require('pdfmake')
const fs = require('fs')

class Report {
  constructor (reportID, date) {
    this.id = reportID
    this.titlePage = new TitlePage('Company', date)
    this.titlePage.setSubheadline('System Integrator', 'John Doe')
    this.titlePage.setSubheadline('Auditor', 'Max Mustermann')
    this.titlePage.setSubheadline('Reviewer', 'Jane Doe')
    this.titlePage.setQR('TODO: Add here something like https://domain/' + reportID)

    this.sections = [new Section('Preface', 1)]
  }

  appendSection (title) {
    const section = new Section(title, this.sections.length + 1)
    this.sections.push(section)
  }

  appendToSection (result, purpose) {
    const testResultTable = new TestResultTable(result, purpose)

    if (this.sections.length <= 0) {
      this.appendSection(new Section('Unnamed Section'))
    }

    const last = this.sections[this.sections.length - 1]  // get the last section
    last.append(testResultTable)
  }

  save (protocol, timestamp) {
    const printer = new PDFMake(getFonts())
    const def = this.render()
    const doc = printer.createPdfKitDocument(def)
    let chunks = []

    doc.on('data', (chunk) => {
      chunks.push(chunk)
    })

    doc.on('end', function () {
      const rawBytes = Buffer.concat(chunks)
      fileHelper.writeFile(rawBytes, pathHelper.storagePath(protocol, timestamp), 'report.pdf')
    })

    doc.end()
  }

  render () {
    return {
      header: HeaderFooter.Header,
      footer: HeaderFooter.Footer,
      content: [
        this.titlePage.render(),
        TOC(),
        this.sections.map((s) => s.render())
      ],
      styles: Styles.ReportStyles
    }
  }
}

const getFonts = () => {
  return {
    Roboto: {
      normal: pathHelper.fontsPath('Roboto-Regular.ttf'),
      bold: pathHelper.fontsPath('Roboto-Bold.ttf'),
      italics: pathHelper.fontsPath('Roboto-RegularItalic.ttf'),
      bolditalics: pathHelper.fontsPath('Roboto-BoldItalic.ttf')
    }
  }
}

module.exports = Report
