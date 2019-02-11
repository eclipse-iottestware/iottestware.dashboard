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

import withResourceFetch from '../utils/hoc/ResourceFetch'
import {Tree} from 'primereact/tree'
import {Panel} from 'primereact/panel'

class ResourcesView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedNodeKey: null,
      selectedNode: null
    }

    this.renderResources = this.renderResources.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
  }

  onSelectionChange (e) {
    this.setState({selectedNodeKey: e.selection.key})
    this.setState({selectedNode: e.selection})
  }

  render () {
    const resources = (this.props.resources) ? this.props.resources : []

    const data = (resources) ? this.renderResources(resources) : undefined
    return (
      <div>
        <div className='content-section section-header section-header-small'>
          <h1>Resources</h1>
        </div>

        <div className='content-section section-content'>
          {data}
        </div>
      </div>
    )
  }

  renderResources (resources) {
    if ((!resources) || resources.length <= 0) {
      return (
        <p>NO DATA</p>
      )
    } else {
      const r = fromResources(resources)
      const preview = nodePreview(this.state.selectedNodeKey, this.state.selectedNode)

      return (
        <div className='ui-g ui-fluid'>
          <div className='ui-g-4'>
            <Tree value={r} selectionMode='single' selectionKeys={this.state.selectedNodeKey} selectionChange={this.onSelectionChange} />
          </div>
          <div className='ui-g-8'>
            {preview}
          </div>
        </div>

      )
    }
  }
}

const nodePreview = (selected, node) => {
  if (selected) {
    return (
      <Panel header={node.label} >
        {
          (!node.isLeaf) ? null : (node.sub) ? <a href={node.link} target='_blank'>{node.sub}</a> : <a href={node.link} target='_blank'>{node.label}</a>
        }
        <hr />
        {
          <p>{node.summary}</p>
        }

      </Panel>
    )
  } else {
    return (
      <Panel />
    )
  }
}

const fromResources = (resources) => {
  let parents = []
  Object.keys(resources).forEach(i => {
    let data = []
    resources[i].forEach(link => {
      const single = fromSingle(link)
      data.push(single) // store a single link structure
    })

    // create the parent element
    const p = parentElement(i, data)
    parents.push(p)
  })

  // TODO check if data is empty and generate default data set
  // console.log('####>>> ' + parents)

  return parents
}

const parentElement = (name, children) => {
  const p = {
    'key': name,
    'label': name,
    'data': 'Documents Folder',
    'icon': 'fa fa-fw fa-book',
    'children': children,
    'summary': 'Knowledge-base for ' + name
  }
  return p
}

const fromSingle = (resource) => {
  const retLink = {
    'key': resource.title,
    'label': resource.title,
    'data': 'File',
    'icon': 'fa fa-fw fa-link',
    'children': [],
    'isLeaf': true,
    'link': resource.link,
    'title': resource.title,
    'sub': resource.sub,
    'summary': resource.summary
  }

  return retLink
}

const WrappedComponent = withResourceFetch(ResourcesView)
export default WrappedComponent
