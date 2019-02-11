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

const testcasePrefixMQTT = 'MQTT_TestCases.'  // the filename of the TestCases TTCN-3 file

module.exports = (data) => {
  let testcases = ''
  data.testcases.forEach((tc) => (testcases += testcasePrefixMQTT + tc + '\n'))

  const configuration = mqttTemplate(data, testcases)
  return configuration
}

const mqttTemplate = (data, testcases) => `[MODULE_PARAMETERS]
tsp_addresses :=
{
	{
		id := "mqtt_server",
		hostName := "${data.host}",
		portNumber := ${data.port}
	},
	{
		id := "mqtt_client",
		hostName := "0.0.0.0",
		portNumber := 45679,

		credentials :=
		{
			clientId := "${data.clientid}",
			username := "${data.username}",
			password := "${data.password}",
			topicName := "${data.topic}"
		}
	}
}

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
