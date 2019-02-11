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
// https://www.npmjs.com/package/xml-js
const convert = require('xml-js')
const fs = require('fs')

const xmlContent = fs.readFileSync('log.xml', 'utf8')
const compactResultJSONOject = JSON.parse(convert.xml2json(xmlContent, {compact: true, spaces: 4}))

for (let i = 0; i < compactResultJSONOject.log.nodes.length; i++) {
  let testResult = {
    'name': compactResultJSONOject.log.nodes[i].name._text,
    'result': compactResultJSONOject.log.nodes[i].result.resultboolean._text,
    'resulttext': compactResultJSONOject.log.nodes[i].result.resulttext._text
  }
  console.log(testResult)
}

/* // uncomment if you want to see extracted XML as JSON
var compactResult = convert.xml2json(xmlContent, {compact: true, spaces: 4});
var nonCompactResult = convert.xml2json(xmlContent, {compact: false, spaces: 4});
fs.writeFile('compactJSON.json', compactResult, function (err) {
    if (err) throw err;
    console.log('Saved JSON-File!');
  });

  fs.writeFile('nonCompactJSON.json', nonCompactResult, function (err) {
    if (err) throw err;
    console.log('Saved JSON-File!');
  });
*/
