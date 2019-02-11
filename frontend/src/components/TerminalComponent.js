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
import ReactDOM from 'react-dom'

import io from 'socket.io-client'

export default class Terminal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isMinimized: false,
      history: []
    }
  }

  componentDidMount () {
    const that = this
    this.socket = io('/')
    this.socket.on('terminal', function (newData) {
      that.setState({
        history: that.state.history.concat(newData)
      })
    })
  }

  componentWillUnmount () {
    this.socket.close()
  }

  componentDidUpdate () {
    const textLogContainer = ReactDOM.findDOMNode(this.textLog)
    if (textLogContainer) {
      textLogContainer.scrollTop = textLogContainer.scrollHeight
    }
  }

  onMinimizeClick (event) {
    this.setState({
      isMinimized: true
    })
  }

  onMaximizeClick (event) {
    this.setState({
      isMinimized: false
    })
  }

  render () {
    const history = this.state.history
    let content = ''
    history.map((line) => {
      content += line.value + '\n'
    })

    let terminalHeight = (this.state.isMinimized) ? 20 : 250
    let textareaHeight = (this.state.isMinimized) ? 0 : 229

    return (
      <div className='ui-terminal' style={{height: terminalHeight + 'px'}}>
        <div className='ui-terminal-titlebar'>
          <div className='ui-terminal-buttons'>
            <div className='ui-terminal-minimize'>
              <button className='ui-terminal-minimizebutton' onClick={this.onMinimizeClick.bind(this)}>
                <span><strong>&ndash;</strong></span>
              </button>
            </div>
            <div className='ui-terminal-maximize'>
              <button className='ui-terminal-maximizebutton' onClick={this.onMaximizeClick.bind(this)}>
                <span><strong>+</strong></span>
              </button>
            </div>
          </div>
          {this.props.title}
        </div>

        {
          (!this.state.isMinimized)
            ? <div className='ui-terminal-content' style={{height: textareaHeight + 'px'}}>
              <textarea
                ref={textLog => this.textLog = textLog}
                name='terminalTextarea'
                readOnly
                value={content} />
            </div> : <div />
        }

      </div>
    )
  }
}
