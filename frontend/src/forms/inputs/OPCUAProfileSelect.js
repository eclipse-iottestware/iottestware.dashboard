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
import {Tree} from 'primereact/tree'

export default class OPCUAProfileSelect extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data1: this.generateData(),
      selectedFile1: null,
      selectedFile2: null,
      selectedFiles1: [],
      selectedFiles2: []
    }
  }

  generateData () {
    return [ serverCategoryModel, clientCategoryModel ]
  }

  render () {
    return (
      <div className='opcua-profile-selection'>
        <h3>Profile Selection</h3>
        <Tree value={this.state.data1}
          style={{'width': '80%'}}
          selectionMode='checkbox'
          selection={this.state.selectedFiles1}
          selectionChange={(e) => this.setState({selectedFiles1: e.selection})} />
        <div style={{ 'marginTop': '8px' }}>
          Selected Nodes:
          {
            this.state.selectedFiles1.map((obj, i) => {
              return <span key={i}>{i !== 0 ? ',' : ''} {obj.label}</span>
            })
          }
        </div>
      </div>
    )
  }
}

const dataAccessModel = {
  'label': 'Data Access',
  'data': 'Data Access',
  'expandedIcon': 'fa fa-fw fa-minus-square-o',
  'collapsedIcon': 'fa fa-fw fa-plus-square-o',
  'children': [
    { 'label': 'Embedded DataChange Subscription Server Facet', 'icon': 'fa fa-fw fa-folder', 'data': 'Embedded DataChange Subscription Server Facet' },
    { 'label': 'Standard DataChange Subscription 2017 Server Facet', 'icon': 'fa fa-fw fa-folder', 'data': 'Standard DataChange Subscription 2017 Server Facet' },
    { 'label': 'Enhanced DataChange Subscription 2017 Server Facet', 'icon': 'fa fa-fw fa-folder', 'data': 'Enhanced DataChange Subscription 2017 Server Facet' },

    { 'label': 'Durable Subscription Server Facet', 'icon': 'fa fa-fw fa-folder', 'data': 'Durable Subscription Server Facet' },
    { 'label': 'Data Access Server Facet', 'icon': 'fa fa-fw fa-folder', 'data': 'Data Access Server Facet' }
  ]
}

const coreCharacteristicsModel = {
  'label': 'Core Characteristics',
  'data': 'Core Characteristics',
  'expandedIcon': 'fa fa-fw fa-minus-square-o',
  'collapsedIcon': 'fa fa-fw fa-plus-square-o',
  'children': [
    { 'label': 'Core 2017 Server Facet', 'icon': 'fa fa-fw fa-folder', 'data': 'Core 2017 Server Facet' },
    { 'label': 'Sessionless Server Facet', 'icon': 'fa fa-fw fa-folder', 'data': 'Sessionless Server Facet' },
    { 'label': 'Reverse Connect Server Facet', 'icon': 'fa fa-fw fa-folder', 'data': 'Reverse Connect Server Facet' },
    { 'label': 'Base Server Bahaviour Facet', 'icon': 'fa fa-fw fa-folder', 'data': 'Base Server Bahaviour Facet' },
    { 'label': 'Request State Change Server Facet', 'icon': 'fa fa-fw fa-folder', 'data': 'Request State Change Server Facet' },
    { 'label': 'Subnet Discovery Server Facet', 'icon': 'fa fa-fw fa-folder', 'data': 'Subnet Discovery Server Facet' }
  ]
}

const fullFeaturedModel = {
  'label': 'Full Featured',
  'data': 'Full Featured',
  'expandedIcon': 'fa fa-fw fa-minus-square-o',
  'collapsedIcon': 'fa fa-fw fa-plus-square-o',
  'children': [
    { 'label': 'Nano Embedded Device 2017 Server Profile', 'icon': 'fa fa-fw fa-folder', 'data': 'Nano Embedded Device 2017 Server Profile' },
    { 'label': 'Micro Embedded Device 2017 Server Profile', 'icon': 'fa fa-fw fa-folder', 'data': 'Micro Embedded Device 2017 Server Profile' },
    { 'label': 'Embedded 2017 UA Server Profile', 'icon': 'fa fa-fw fa-folder', 'data': 'Embedded 2017 UA Server Profile' },
    { 'label': 'Standard 2017 UA Server Profile', 'icon': 'fa fa-fw fa-folder', 'data': 'Standard 2017 UA Server Profile' },
    { 'label': 'Global Discovery Server 2017 Profile', 'icon': 'fa fa-fw fa-folder', 'data': 'Global Discovery Server 2017 Profile' },
  ]
}

const facetsModel = {
  'label': 'Facets',
  'data': 'Facets',
  'expandedIcon': 'fa fa-fw fa-minus-square-o',
  'collapsedIcon': 'fa fa-fw fa-plus-square-o',
  'children': [coreCharacteristicsModel, dataAccessModel]
}

const serverCategoryModel = {
  'label': 'Server Category',
  'data': 'Server Category',
  'expandedIcon': 'fa fa-fw fa-minus-square-o',
  'collapsedIcon': 'fa fa-fw fa-plus-square-o',
  'children': [facetsModel, fullFeaturedModel]
}

const clientCategoryModel = {
  'label': 'Client Category',
  'data': 'Client Category',
  'expandedIcon': 'fa fa-fw fa-minus-square-o',
  'collapsedIcon': 'fa fa-fw fa-plus-square-o',
  'children': [
    { 'label': 'Publisher Category', 'icon': 'fa fa-fw fa-folder', 'data': 'Publisher Category' },
    { 'label': 'Subscriber Category', 'icon': 'fa fa-fw fa-folder', 'data': 'Subscriber Category' },
  ]
}
