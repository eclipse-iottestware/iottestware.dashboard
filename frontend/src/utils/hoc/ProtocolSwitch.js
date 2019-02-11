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
const withProtocolSwitch = (WrappedComponent) => {
  class HOC extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        protocol: null
      }
    }

    componentDidMount () {
      const protocol = this.props.match.params.protocol

      this.setState(update(this.state, {protocol: {$set: protocol}}))
    }

    componentWillReceiveProps (nextProps) {
      const protocol = nextProps.match.params.protocol

      if (protocol !== this.state.protocol) {
        this.setState(update(this.state, {protocol: {$set: protocol}}))
      }
    }

    render () {
      if (this.state.protocol) {
        return (
          <WrappedComponent protocol={this.state.protocol} />
        )
      } else {
        return (
          <WrappedComponent protocol={undefined} />
        )
      }
    }
  }

  return HOC
}

export default withProtocolSwitch
