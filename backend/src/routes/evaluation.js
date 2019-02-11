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

/**
 * Express Router providing endpoint to retrieve evaluation reports
 */
const express = require('express')
const router = express.Router()
const fileHelper = require('../helpers/fileHelper')
const pathHelper = require('../helpers/pathHelper')

router.get('/', function (req, res, next) {
  res.status(200).json({'reports': getEvaluationReports()})
})

router.get('/mqtt', function (req, res, next) {
  res.status(200).json({'reports': getEvaluationReports('mqtt')})
})

router.get('/mqtt/:file', function (req, res, next) {
  deliverFile(req.params.file, res)
})

router.get('/coap', function (req, res, next) {
  res.status(200).json({'reports': getEvaluationReports('coap')})
})

router.get('/coap/:file', function (req, res, next) {
  deliverFile(req.params.file, res)
})

router.get('/opc', function (req, res, next) {
  res.status(200).json({'reports': getEvaluationReports('opc')})
})

router.get('/opc/:file', function (req, res, next) {
  deliverFile(req.params.file, res)
})

function getEvaluationReports (prefix) {
  let fileNames = []

  const evaluationDir = pathHelper.resourcesPath('evaluation')
  const allFiles = fileHelper.directoryFiles(evaluationDir)

  allFiles.forEach(file => {
    if (file.startsWith(prefix) || prefix === undefined) {
      fileNames.push(file)
    }
  })

  return fileNames
}

function deliverFile (filename, res) {
  const fileUri = pathHelper.resourcesPath('evaluation', filename)

  const rawData = fileHelper.readFileSync(fileUri)

  if (rawData) {
    const data = JSON.parse(rawData)

    res.status(200).json(data)
  } else {
    res.status(404).json({'message': 'File ' + filename + ' does not exist'})
  }
}

module.exports = router
