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
import React, {Component} from 'react'

export default class IconsPage extends Component {
  render () {
    return (
      <div class='icons-page'>
        <div className='content-section introduction'>
          <div className='feature-intro'>
            <h1>Icons</h1>
            <p>PrimeReact components internally use <a href='https://github.com/primefaces/primeicons'>PrimeIcons</a> library, the official icons suite from <a href='https://www.primetek.com.tr'>PrimeTek</a>.</p>
          </div>
        </div>

        <div className='content-section documentation'>
          <h3 style={{marginTop: 0}}>Download</h3>
          <p>PrimeIcons is available at npm, run the following command to download it to your project.</p>
          <p className='language-javascript'>
            {`npm install primeicons --save`}
          </p>

          <h3>Getting Started</h3>
          <p>PrimeIcons use the <strong>pi pi-&#123;icon&#125;</strong> syntax such as <strong>pi pi-check</strong>.
            A standalone icon can be displayed using an element such as <i>i</i> or <i>span</i></p>

          <i class='pi pi-check' />
          <i class='pi pi-times' />

          <h3>Size</h3>
          <p>Size of the icons can easily be changed using font-size property.</p>

          <i class='pi pi-check' />

          <i class='pi pi-check' style={{'fontSize': '3em'}} />

          <h3>Spinning Animation</h3>
          <p>Special pi-spin class applies infinite rotate to an icon.</p>

          <i class='pi pi-spin pi-spinner' style={{'fontSize': '3em'}} />

          <h3>List of Icons</h3>
          <p>Here is the current list of PrimeIcons, more icons will be added periodically. You may also <a href='https://github.com/primefaces/primeicons/issues'>request new icons</a> at the issue tracker.</p>
          <div class='ui-g icons-list'>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-exclamation-triangle' />
              <div>pi-exclamation-triangle</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-chevron-circle-left' />
              <div>pi-chevron-circle-left</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-chevron-circle-down' />
              <div>pi-chevron-circle-down</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-chevron-circle-right' />
              <div>pi-chevron-circle-right</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-chevron-circle-up' />
              <div>pi-chevron-circle-up</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-calendar' />
              <div>pi-calendar</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-angle-double-down' />
              <div>pi-angle-double-down</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-angle-double-left' />
              <div>pi-angle-double-left</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-angle-double-right' />
              <div>pi-angle-double-right</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-angle-double-up' />
              <div>pi-angle-double-up</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-angle-down' />
              <div>pi-angle-down</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-angle-left' />
              <div>pi-angle-left</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-angle-right' />
              <div>pi-angle-right</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-angle-up' />
              <div>pi-angle-up</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-upload' />
              <div>pi-upload</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-ban' />
              <div>pi-ban</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-star-o' />
              <div>pi-star-o</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-star' />
              <div>pi-star</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-chevron-down' />
              <div>pi-chevron-down</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-chevron-left' />
              <div>pi-chevron-left</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-chevron-right' />
              <div>pi-chevron-right</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-chevron-up' />
              <div>pi-chevron-up</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-caret-down' />
              <div>pi-caret-down</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-caret-left' />
              <div>pi-caret-left</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-caret-right' />
              <div>pi-caret-right</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-caret-up' />
              <div>pi-caret-up</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-search' />
              <div>pi-search</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-check' />
              <div>pi-check</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-check-circle' />
              <div>pi-check-circle</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-times' />
              <div>pi-times</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-times-circle' />
              <div>pi-times-circle</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-plus' />
              <div>pi-plus</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-plus-circle' />
              <div>pi-plus-circle</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-minus' />
              <div>pi-minus</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-minus-circle' />
              <div>pi-minus-circle</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-circle-on' />
              <div>pi-circle-on</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-circle-off' />
              <div>pi-circle-off</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-sort' />
              <div>pi-sort</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-sort-up' />
              <div>pi-sort-up</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-sort-down' />
              <div>pi-sort-down</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-step-backward' />
              <div>pi-step-backward</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-step-forward' />
              <div>pi-step-forward</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-th-large' />
              <div>pi-th-large</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-arrow-down' />
              <div>pi-arrow-down</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-arrow-left' />
              <div>pi-arrow-left</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-arrow-right' />
              <div>pi-arrow-right</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-arrow-up' />
              <div>pi-arrow-up</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-bars' />
              <div>pi-bars</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-arrow-circle-down' />
              <div>pi-arrow-circle-down</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-arrow-circle-left' />
              <div>pi-arrow-circle-left</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-arrow-circle-right' />
              <div>pi-arrow-circle-right</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-arrow-circle-up' />
              <div>pi-arrow-circle-up</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-info' />
              <div>pi-info</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-info-circle' />
              <div>pi-info-circle</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-home' />
              <div>pi-home</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-spinner' />
              <div>pi-spinner</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-external-link' />
              <div>pi-external-link</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-window-maximize' />
              <div>pi-window-maximize</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-window-minimize' />
              <div>pi-window-minimize</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-refresh' />
              <div>pi-refresh</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-user' />
              <div>pi-user</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-user-plus' />
              <div>pi-user-plus</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-user-minus' />
              <div>pi-user-minus</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-users' />
              <div>pi-users</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-clock' />
              <div>pi-clock</div>
            </div>
            <div class='ui-g-12 ui-md-2'>
              <i class='pi pi-trash' />
              <div>pi-trash</div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
