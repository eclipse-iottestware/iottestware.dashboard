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
import update from 'immutability-helper'
import { resourcesURI } from '../BackendEndpoints'

/**
 * This Higher Order Component (HOC: https://reactjs.org/docs/higher-order-components.html)
 * TODO:
 * @param WrappedComponent
 * @returns {HOC}
 */
const withResourceFetch = (WrappedComponent) => {
  class HOC extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        protocol: undefined,
        resources: undefined
      }

      this.loadResources = this.loadResources.bind(this)
      this.reloadResources = this.reloadResources.bind(this)
    }

    componentDidMount () {
      const protocol = this.props.match.params.protocol
      this.reloadResources(protocol)
    }

    componentWillReceiveProps (nextProps) {
      const protocol = nextProps.match.params.protocol
      if (protocol !== this.state.protocol) {
        this.setState(update(this.state, {protocol: {$set: protocol}}))
        this.reloadResources(protocol)
      }
    }

    reloadResources (protocol) {
      this.setState(update(this.state, {resources: {$set: []}}))  // reset the links before
      this.loadResources(protocol)
    }

    loadResources (protocol) {
      const endpoint = resourcesURI(protocol)

      fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }})
        .then(async response => {
          if (response.status !== 200) {
            const errorMessage = await response.json()
            throw errorMessage
          }
          return response.json()
        })
        .then(data => {
          this.setState(update(this.state, {resources: {$set: data}}))
        }).catch(error => {
          console.log('ERROR Resourcefetch ' + error)
        })
    }

    render () {
      if (this.state.protocol) {
        return (
          <WrappedComponent protocol={this.state.protocol} resources={this.state.resources} />
        )
      } else {
        return (
          <WrappedComponent resources={this.state.resources} />
        )
      }
    }
  }

  return HOC
}

export default withResourceFetch
