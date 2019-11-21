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

// the filenames of the TestCases TTCN-3 file which contain the testcases
// these are required to construct the testcase identifiers in configuration files
// e.g. MQTT_TestCases.TC_{ID}
const brokerTestingFile = 'MQTT_TestCases'
const clientTestingFile = 'MQTT_Broker_Testcases'

module.exports = (sut, data) => {
  let testcases = ''

  let configuration

  if (sut.toLowerCase() === 'broker') {
    data.testcases.forEach((tc) => (testcases += brokerTestingFile + '.' + tc + '\n'))
    configuration = brokerTestingConfig(data, testcases)
  } else if (sut.toLowerCase() === 'client') {
    data.testcases.forEach((tc) => (testcases += clientTestingFile + '.' + tc + '\n'))

    // adding Test System Parameters:
    // the Upper Tester will require the IP of the Test System to be able to connect
    const os = require('os')
    const interfaces = os.networkInterfaces()
    Object.keys(interfaces).forEach(key => {
      interfaces[key].forEach(inf => {
        //console.log('-> Interface ' + key + ': ' + inf.address + ' ' + inf.netmask + ' ==> ' + JSON.stringify(data.tsInterface))
        // let's consider only IPv4 for now!
        if (inf.family === 'IPv4') {
          if (key === data.tsInterface.name) { data.tsHost = inf.address }
        }
      })
    })

    configuration = clientTestingConfig(data, testcases)
  }

  return configuration
}

const brokerTestingConfig = (data, testcases) => `
[MODULE_PARAMETERS]
PX_SUT_HOSTNAME := "${data.host}"
PX_SUT_PORT := ${data.port}

PX_CLIENTS :=
{
  {
    clientId := "${data.clients[0].clientid}",
    username := "${data.clients[0].username}",
    password := "${data.clients[0].password}"
  },
  {
    clientId := "${data.clients[1].clientid}",
    username := "${data.clients[1].username}",
    password := "${data.clients[1].password}"
  }
}

PX_TOPIC_NAME := "${data.topic}"
PX_TOPIC_NAME_RESTRICTED := "eclipse/iot/testware/restricted"

PX_REUSE_ADDRESS := true
PX_MAX_RESPONSE_TIME := 10.0

# used in FEAT_QOS testcases
PX_UPGRADE_QOS := false

# are clients allowd to publish to $SYS topics?
PX_ALLOWED_PUBLISH_SYS := false

[LOGGING]
LogFile := "${data.path}/%e.%h-%r.%s"
FileMask := LOG_ALL | DEBUG | MATCHING
ConsoleMask := ERROR | WARNING | TESTCASE | STATISTICS | PORTEVENT
LogSourceInfo := Yes
AppendFile := No
TimeStampFormat := DateTime
LogEventTypes := Yes
SourceInfoFormat := Single
LogEntityName := Yes

[TESTPORT_PARAMETERS]
*.p.debug:="YES"
*.p.noDelay:="YES"

[EXECUTE]
${testcases}

[MAIN_CONTROLLER]
TCPPort := 0
KillTimer := 10.0
UnixSocketsEnabled := Yes
`
const clientTestingConfig = (data, testcases) => `
[MODULE_PARAMETERS]
## MQTT Broker (Test System) configuration
PX_LISTEN_HOSTNAME := "${data.tsHost}"
PX_LISTEN_PORT := 1883

## Upper Tester configuration. 
## UT must be running on client side
PX_UPPER_TESTER_HOSTNAME := "${data.host}"
PX_UPPER_TESTER_PORT := ${data.port}

## Timeouts and timeout behaviours
PX_KEEP_ALIVE := 5                  # keep alive interval (3.1.2.10)
PX_MAX_TC_TIMER := 10.0             # max duration of a single testcase
PX_ON_TIMEOUT_VERDICT := true       # set a verdict if testcase times out?
PX_ON_TIMEOUT_VERDICT_VAL := inconc # if set, which verdict to set? inconc or fail?

PX_PUB_RETRANSMISSION_TIMER := 5.0  # max duration of a publish retransmission
PX_AWAIT_NO_RESPONSE_TIMER := 5.0   # max duration to wait for a "NO RESPONSE"

## Optional behaviours
PX_ACCEPT_ANY_PROTOCOL_NAME      := false   # see [MQTT-3.1.2-1]
PX_ALLOW_LONG_CLIENT_IDS         := true    # see [MQTT-3.1.3-5]
PX_ALLOW_SPECIAL_CHAR_CLIENT_IDS := true    # see [MQTT-3.1.3-5]

[LOGGING]
LogFile := "${data.path}/%e.%h-%r.%s"
FileMask := LOG_ALL
ConsoleMask := ERROR | WARNING | TESTCASE | STATISTICS | PORTEVENT
LogSourceInfo := Yes
AppendFile := No
TimeStampFormat := DateTime
LogEventTypes := Yes
SourceInfoFormat := Single
LogEntityName := Yes

[TESTPORT_PARAMETERS]
system.IPL4_PCO.debug := "Yes"

[EXECUTE]
${testcases}

[MAIN_CONTROLLER]
TCPPort := 0
KillTimer := 10.0
`
