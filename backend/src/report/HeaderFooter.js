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

const Header = (page) => {
  if (page !== 1) {
    return {
      columns: [
        {
          text: 'IoT-Testware',
          style: 'header_left'
        },
        {
          text: 'Test Report',
          style: 'header_center'
        },
        {
          text: new Date().toLocaleString(),
          style: 'header_right'
        }
      ],
      style: 'header'
    }
  }
}

const Footer = (page, pages) => {
  return {
    columns: [
      {
        text: page.toString() + ' of ' + pages.toString(),
        style: 'footer_pages'
      }
    ],
    style: 'footer'
  }
}

exports.Header = Header
exports.Footer = Footer
