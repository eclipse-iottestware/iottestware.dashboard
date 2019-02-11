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

import { Link } from 'react-router-dom'
import React from 'react'

export default class Footer extends React.Component {
  render () {
    return (
      <div>
        <span>
          <Link to='/gdpr' >GDPR</Link>
        </span>
        <div className='footer-links'>
          <a href='https://github.com/eclipse/iottestware' target='_blank'>
            <i className=' icon-github fa fa-github-square' /></a>
          <a href='https://iottestware.readthedocs.io/en/latest/index.html' target='_blank'>
            <i className=' icon-docs fa fa-book' /></a>
        </div>
      </div>
    )
  }
}
