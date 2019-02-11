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

const testcasePrefixCoAP = 'CoAP_Testcases.' // the filename of the TestCases TTCN-3 file

module.exports = (data) => {
  let testcases = ''
  data.testcases.forEach((tc) => (testcases += testcasePrefixCoAP + tc.toUpperCase() + '\n'))

  const configuration = coapConfTemplate(data, testcases)
  return configuration
}

const coapConfTemplate = (data, testcases) => `[MODULE_PARAMETERS]
PX_SERVER_ID := "remote";
PX_SERVER_HOST := "${data.host}";
PX_SERVER_PORT := ${data.port};

// Note: These resources are static for now
PX_DEFAULT_RESOURCE := "/test";
PX_METHOD_NOT_ALLOWED_RESOURCE := "/query";
PX_FIRST_LVL_RESOURCE := "/test"
PX_SECOND_LVL_RESOURCE := "/seg1/seg2";
PX_THIRD_LVL_RESOURCE := "/seg1/seg2/seg3";
PX_NEW_RESOURCE := "/create1";
PX_STORAGE_RESOURCE := "/query ";
PX_SEPARATE_RESOURCE := "/separate";

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
