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

export default class NetworkInterfaces extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      interfaces: undefined
    }
  }

  componentDidMount () {
    fetch('/v1/tools/ifconfig')
      .then(response => response.json())
      .then(data => this.setState({interfaces: data}))
  }

  renderInterface (item) {
    return (
      <li key={item} className='topbar-submenu-interface'>{item}</li>
    )
  }

  renderInterfaceData (label, key, icon1, icon2) {
    return (
      <li key={key} className='ui-text'>
        {
          (icon1 !== undefined && icon2 !== undefined)
          ? <span className='fa-stack fa-lg'>
            <i className={icon1} />
            <i className={icon2} />
          </span> : (icon1 !== undefined) ? <i className={icon1} /> : <i />
        }

        {label}
      </li>
    )
  }

  render () {
    let allInterfaces = []
    let addrIcon1 = 'fa fa-fw fa-square fa-stack-2x'
    let addrIcon2 = 'fa fa-fw fa-desktop fa-stack-1x fa-inverse'

    let maskIcon1 = 'fa fa-fw fa-square fa-stack-2x'
    let maskIcon2 = 'fa fa-fw fa-filter fa-stack-1x fa-inverse'

    let hwAddrIcon1 = 'fa fa-fw fa-square fa-stack-2x'
    let hwAddrIcon2 = 'fa fa-fw fa-microchip fa-stack-1x fa-inverse'

    if (this.state.interfaces !== undefined) {
      // console.log('==> ' + JSON.stringify(this.state.interfaces))
      Object.keys(this.state.interfaces).forEach((item) => {
        // TODO: do the filtering in the backend
        if (item !== 'lo' && item !== 'lo0' && this.state.interfaces[item].length > 0) {
          allInterfaces.push(this.renderInterface(item))

          // now the subarrays from each interface
          this.state.interfaces[item].map((interfaceItem) => {
            if (interfaceItem.family === 'IPv4') {
              let addrLabel = 'Address: ' + interfaceItem.address
              let addrKey = interfaceItem.address
              allInterfaces.push(this.renderInterfaceData(addrLabel, addrKey, addrIcon1, addrIcon2))

              let maskLabel = 'Netmask: ' + interfaceItem.netmask
              let maskKey = interfaceItem.address + ':' + interfaceItem.netmask
              allInterfaces.push(this.renderInterfaceData(maskLabel, maskKey, maskIcon1, maskIcon2))

              let macLabel = 'MAC: ' + interfaceItem.mac
              let macKey = interfaceItem.mac
              allInterfaces.push(this.renderInterfaceData(macLabel, macKey, hwAddrIcon1, hwAddrIcon2))
            }
          })
        }
      })
    }

    return (
      <ul>
        {allInterfaces}
      </ul>
    )
  }
}
