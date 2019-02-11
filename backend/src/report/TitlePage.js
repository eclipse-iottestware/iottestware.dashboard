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

class TitlePage {
  constructor (company, date) {
    this.company = company
    this.date = date
    this.subheadlines = []
    this.qr = ''
  }

  setSubheadline (title, name) {
    const shl = {
      text: title + ': ' + name,
      style: 'title_subheadline'
    }
    this.subheadlines.push(shl)
  }

  setQR (qr) {
    this.qr = qr
  }

  render () {
    return {
      stack:
      [
        {
          text: 'IoT-T Test Report: ' + this.company,
          style: 'title_headline'
        },
        this.subheadlines,
        {
          text: 'Date: ' + this.date,
          style: 'title_date'
        },
        {
          qr: this.qr,
          style: 'title_qr'
        }
      ],
      style: 'title',
      pageBreak: 'after'
    }
  }
}

module.exports = TitlePage
