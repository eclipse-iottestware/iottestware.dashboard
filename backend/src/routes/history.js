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
 * Express Router providing endpoint to retrieve historical configuration files from /tmp
 *
 */
const express = require('express')
const fileHelper = require('../helpers/fileHelper')
const pathHelper = require('../helpers/pathHelper')
const protocolNamings = require('../helpers/protocolNamings')
const archiver = require('archiver')
const router = express.Router()

/**
 * Route gets the historical files for all test runs and returns with directory structure
 */
router.get('/', function (req, res) {
  let ret = []
  const dirs = fileHelper.subDirectories(pathHelper.storagePath())
  dirs.forEach(d => {
    const currentPath = pathHelper.storagePath(d)
    const subdirs = fileHelper.subDirectories(currentPath)
    subdirs.forEach(sd => {
      const subdirectory = pathHelper.storagePath(d, sd)
      const files = fileHelper.directoryFiles(subdirectory)
      const entry = {'id': sd, 'protocol': protocolNamings.readableProtocol(d), 'files': files}
      ret.push(entry)
    })
  })

  if (ret.length > 0) {
    res.status(200).json({'testruns': ret})
  } else {
    res.status(404).json({'message': 'No historical data found'})
  }
})

/**
 * check and validate the parameters before proceed to the next route
 */
router.use('/download/:proto/:ts', function (req, res, next) {
  const proto = protocolNamings.lowerCaseProtocol(req.params.proto)
  const timestamp = req.params.ts

  if (!proto) {
    res.status(404).json({'message': 'Parameter ' + req.params.proto + ' is invalid'})
    return
  }

  if (!fileHelper.uriExist(pathHelper.storagePath(proto, timestamp))) {
    res.status(404).json({'message': 'Resource not found'})
    return
  }

  next()
})

/**
 * Route gets the all historical files for <PROTOCOL> test runs and responds with a blob if no specific filename is given
 */
router.get('/download/:proto/:ts', function (req, res) {
  const proto = protocolNamings.lowerCaseProtocol(req.params.proto)
  const protoName = protocolNamings.readableProtocol(proto)
  const timestamp = req.params.ts

  const folderName = protoName + '_' + timestamp
  const fileName = folderName + '.zip'

  const zip = archiver('zip')

  res.writeHead(200, {
    'Content-Type': 'application/zip',
    'Content-disposition': 'attachment; filename=' + fileName
  })

  zip.pipe(res)

  zip.directory(pathHelper.storagePath(proto, timestamp), folderName)
  zip.finalize()
})

/**
 * check and validate the parameters before proceed to the next route
 */
router.use('/download/:proto/:ts/:filename', function (req, res, next) {
  const proto = protocolNamings.lowerCaseProtocol(req.params.proto)
  const timestamp = req.params.ts
  const filename = req.params.filename

  if (!proto) {
    res.status(404).json({'message': 'Parameter ' + req.params.proto + ' is invalid'})
    return
  }

  if (!fileHelper.uriExist(pathHelper.storagePath(proto, timestamp, filename))) {
    res.status(404).json({'message': 'Resource not found'})
    return
  }

  next()
})

/**
 * Route gets the historical file for <PROTOCOL> test run and responds with a blob
 */
router.get('/download/:proto/:ts/:filename', function (req, res) {
  const proto = protocolNamings.lowerCaseProtocol(req.params.proto)
  const timestamp = req.params.ts
  const filename = req.params.filename

  res.status(200).download(pathHelper.storagePath(proto, timestamp, filename))
})

/**
 * check and validate the parameters before proceed to the next route
 */
router.use('/delete/:proto/:ts', function (req, res, next) {
  const proto = protocolNamings.lowerCaseProtocol(req.params.proto)
  const timestamp = req.params.ts

  if (!proto) {
    res.status(404).json({'message': 'Parameter ' + req.params.proto + ' is invalid'})
    return
  }

  if (!fileHelper.uriExist(pathHelper.storagePath(proto, timestamp))) {
    res.status(204).json({'message': 'Resource not found'})
    return
  }

  next()
})

/**
 * Route deletes all historical files for <PROTOCOL> test runs
 */
router.delete('/delete/:proto/:ts', function (req, res) {
  const proto = protocolNamings.lowerCaseProtocol(req.params.proto)
  const timestamp = req.params.ts
  const uri = pathHelper.storagePath(proto, timestamp)

  if (fileHelper.fileDelete(uri)) {
    res.status(200).json({message: proto + '/' + timestamp})
  } else {
    res.status(204).json({reason: 'Could not delete'})
  }
})



/**
 * check and validate the parameters before proceed to the next route
 */
router.use('/read/:proto/:ts/:filename', function (req, res, next) {
  const proto = protocolNamings.lowerCaseProtocol(req.params.proto)
  const timestamp = req.params.ts
  const filename = req.params.filename

  if (!proto) {
    res.status(404).json({'message': 'Parameter ' + req.params.proto + ' is invalid'})
    return
  }

  if (!fileHelper.uriExist(pathHelper.storagePath(proto, timestamp, filename))) {
    res.status(404).json({'message': 'Resource not found'})
    return
  }

  next()
})

/**
 * Route gets the historical file for <PROTOCOL> test run and responds with the content of the file
 */
router.get('/read/:proto/:ts/:filename', function (req, res) {
  const proto = protocolNamings.lowerCaseProtocol(req.params.proto)
  const timestamp = req.params.ts
  const filename = req.params.filename

  res.status(200).json({content: fileHelper.readFileSync(pathHelper.storagePath(proto, timestamp, filename))})
})

/**
 * check and validate the parameter before proceed to the next route
 */
router.use('/:proto', function (req, res, next) {
  const proto = protocolNamings.lowerCaseProtocol(req.params.proto)

  if (!proto) {
    res.status(404).json({'message': 'Parameter ' + req.params.proto + ' is invalid'})
    return
  }

  if (!fileHelper.uriExist(pathHelper.storagePath(proto))) {
    res.status(404).json({'message': protocolNamings.readableProtocol(proto) + ' does not contain any history'})
    return
  }

  next()
})

/**
 * Route reads all historical files for all test runs for the requested protocol
 */
router.get('/:proto', function (req, res) {
  const proto = protocolNamings.lowerCaseProtocol(req.params.proto)
  const protoName = protocolNamings.readableProtocol(proto)

  let ret = []
  const dirs = fileHelper.subDirectories(pathHelper.storagePath(proto))

  dirs.forEach(d => {
    const files = fileHelper.directoryFiles(pathHelper.storagePath(proto, d))
    const entry = {'id': d, 'protocol': protoName, 'files': files}
    ret.push(entry)
  })
  res.status(200).json({'testruns': ret})
})

module.exports = router
