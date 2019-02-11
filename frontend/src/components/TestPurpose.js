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
import React from 'react'

export const testPurpose = (data, timestamp) => {
  return (
    <div className='ui-g ui-fluid'>
      <div className='ui-g-12 ui-md-12'>

        {
          (timestamp) && (
            <div className='ui-g'>
              <div className='ui-md-2 tdl-field tdl-label'>Timestamp: </div>
              <div className='ui-md-10 tdl-field'>{timestamp}</div>
            </div>
          )
        }

        <div className='ui-g'>
          <div className='ui-md-2 tdl-field tdl-label'>TP ID: </div>
          <div className='ui-md-10 tdl-field'>{data.id}</div>
        </div>

        <div className='ui-g'>
          <div className='ui-md-2 tdl-field tdl-label'>Test Objective: </div>
          <div className='ui-md-10 tdl-field'>{data.objective}</div>
        </div>

        <div className='ui-g'>
          <div className='ui-md-2 tdl-field tdl-label'>Reference: </div>
          <div className='ui-md-10 tdl-field'>{data.reference}</div>
        </div>

        {
          (data.config) && (
            <div className='ui-g'>
              <div className='ui-md-12 tdl-field tdl-label'>Config Id: </div>
              <div className='ui-md-12 tdl-field'>
                <xmp>
                  {data.config}
                </xmp>
              </div>
            </div>
          )
        }

        <div className='ui-g'>
          <div className='ui-md-2 tdl-field tdl-label'>PICS: </div>
          <div className='ui-md-10 tdl-field'>
            {
              <ul className='fa-ul'>
                {data.PICS.map(p => (<li key={data.id + '_' + p}><i className='fa-li fa fa-map-pin fa-rotate-270' />{p}</li>))}
              </ul>
            }
          </div>
        </div>

        {
          (data.init) && (
            <div className='ui-g'>
              <div className='ui-md-12 tdl-field tdl-label'>Initial conditions: </div>
              <div className='ui-md-12 tdl-field'>
                <xmp>
                  {data.init}
                </xmp>
              </div>
            </div>
          )
        }

        <div className='ui-g'>
          <div className='ui-md-12 tdl-field tdl-label'>Expected Behaviour: </div>
          <div className='ui-md-12 tdl-field'>
            <xmp>
              {data.expected}
            </xmp>
          </div>
        </div>

        {
          (data.final) && (
            <div className='ui-g'>
              <div className='ui-md-12 tdl-field tdl-label'>Final conditions: </div>
              <div className='ui-md-12 tdl-field'>
                <xmp>
                  {data.final}
                </xmp>
              </div>
            </div>
          )
        }

      </div>
    </div>
  )
}
