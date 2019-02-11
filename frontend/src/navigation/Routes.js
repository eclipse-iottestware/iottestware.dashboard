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
import { Route } from 'react-router-dom'
import HomeView from '../views/HomeView'
import GettingStartedView from '../views/GettingStartedView'
import TestPurposesView from '../views/TestPurposeView'
import HistoryView from '../views/HistoryView'
import TestSuitesView from '../views/TestSuitesView'
import MQTTView from '../views/MQTTView'
import EvaluationView from '../views/EvaluationView'
import CoAPView from '../views/CoAPView'
import OPCUAView from '../views/OPCUAView'
import ToolsView from '../views/ToolsView'
import PingView from '../views/PingView'
import NmapView from '../views/NmapView'
import HelpView from '../views/HelpView'
import ResourcesView from '../views/ResourcesView'
import FuzzingView from '../views/FuzzingView'
import DnsMapView from '../views/DnsMapView'
import OPCUAValidatorView from '../views/OPCUAValidatorView'
import GDPRView from '../views/GDPRView'
import AboutView from '../views/AboutView'
import TerminalView from '../views/TerminalView'
import ThemingPage from '../demos/ThemingPage'
import IconsPage from '../demos/IconsPage'
import TestResultsView from '../views/TestResultsView'

export default class Routes extends React.Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={HomeView} />
        <Route exact path='/started' component={GettingStartedView} />
        <Route path='/history/:protocol?' component={HistoryView} />
        <Route path='/testpurposes/:protocol?' component={TestPurposesView} />
        <Route path='/eval/:protocol?' component={EvaluationView} />
        <Route path='/testresults/:protocol?' component={TestResultsView} />
        <Route path='/help/:protocol?' component={HelpView} />
        <Route path='/resources/:protocol?' component={ResourcesView} />
        <Route path='/fuzzing/:protocol?' component={FuzzingView} />

        <Route exact path='/testsuites' component={TestSuitesView} />
        <Route exact path='/testsuites/mqtt' component={MQTTView} />
        <Route exact path='/testsuites/coap' component={CoAPView} />
        <Route exact path='/testsuites/opcua' component={OPCUAView} />
        <Route exact path='/tools' component={ToolsView} />
        <Route exact path='/tools/ping' component={PingView} />
        <Route exact path='/tools/nmap' component={NmapView} />
        <Route exact path='/tools/dns' component={DnsMapView} />
        <Route exact path='/tools/opcua' component={OPCUAValidatorView} />
        <Route exact path='/dataprotection' component={GDPRView} />
        <Route exact path='/gdpr' component={GDPRView} />
        <Route exact path='/about' component={AboutView} />

        <Route exact path='/demo/terminal' component={TerminalView} />
        <Route exact path='/theming' component={ThemingPage} />
        <Route exact path='/icons' component={IconsPage} />
      </div>
    )
  }
}
