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

/**
 * This Higher Order Component (HOC: https://reactjs.org/docs/higher-order-components.html) reads the requested protocol
 * from properties and forwards the protocol to WrappedComponent
 * @param WrappedComponent
 * @returns {HOC}
 */
const withTestConfigSwitch = (WrappedComponent) => {
  class HOC extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        config: null,
        protocol: null
      }
    }

    componentDidMount () {
      if (this.props.match && this.props.match.params) {
        // console.log('PARAMS: ->  ', this.props.match.params.protocol)
        if (this.props.match.params.protocol) {
          const protocol = this.props.match.params.protocol
          // console.log('\tProtocol: ', protocol)
          this.setState(update(this.state, { protocol: { $set: protocol } }))
        }

        if (this.props.match.params.config) {
          const config = this.props.match.params.config
          // console.log('\tConfig: ', config)
          this.setState(update(this.state, { config: { $set: config } }))
        }
      }

      // console.log('AFTER MOUNT: ', this.state)
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.match && nextProps.match.params && nextProps.match.params.protocol) {
        const protocol = nextProps.match.params.protocol
        if (protocol !== this.state.protocol) {
          this.setState(update(this.state, { protocol: { $set: protocol } }))
        }
      }

      if (nextProps.match && nextProps.match.params && nextProps.match.params.config) {
        const config = nextProps.match.params.config
        if (config !== this.state.config) {
          this.setState(update(this.state, { config: { $set: config } }))
        }
      }
    }

    render () {
      //console.log('SWITCH RENDER: ', this.state.config, ' <==> ', this.state.protocol)
      return (
        (this.state.config !== undefined && this.state.protocol !== undefined)
        ? <WrappedComponent config={this.state.config} protocol={this.state.protocol} />
        : <i className='pi pi-spin pi-spinner' style={{'fontSize': '3em'}} />
      )
    }
  }

  return HOC
}

export default withTestConfigSwitch
