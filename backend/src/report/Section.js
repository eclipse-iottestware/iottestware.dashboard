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

class Section {
  constructor (title, index) {
    this.title = title
    this.index = index
    this.content = []
  }

  append (content) {
    this.content.push(content)
  }

  render () {
    return [
      {text: this.index + '. ' + this.title, style: 'section_header_1', tocItem: true},
      [
        this.content.map(c => c.render())
      ]
    ]
  }
}

module.exports = Section
