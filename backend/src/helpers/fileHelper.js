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
const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')

/**
 * The fileHelper wraps the raw libraries like fs, path, fse and will provide easy-to-use functions for the work with files on the file system
 */

/**
 * Wraps the fs.writeFileSync() function. Additionally mkdirSync() is applied if the required path is not existent
 *
 * @param content is the content to write
 * @param filePath is the path where the created file will be stored
 * @param fileName is the filename of the newly created file
 */
function writeFileSync (content, filePath, fileName) {
  if (!fs.existsSync(filePath)) {
    mkdirSync(filePath)
  }

  // let filePath = path + fileId
  const fileURI = path.join(filePath, fileName)

  fs.writeFileSync(fileURI, content, function (err) {
    if (err) console.error(err)
  })
}

function readFileSync (fileUri) {
  if (uriExist(fileUri)) {
    return fs.readFileSync(fileUri, 'utf8')
  }
}

/**
 * This function creates the complete path if not existent
 * @param filePath
 */
function mkdirSync (filePath) {
  let paths = filePath.split(path.sep)
  paths.shift() // will remove the first argument as this one is empty

  let fullPath = '/'
  paths.forEach((pathToken) => {
    if (fullPath === '') {
      fullPath = pathToken
    } else {
      fullPath = path.join(fullPath, pathToken)
    }

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath)
    }
  })
}

/**
 * Check if the a file exists in a folder
 * @param filePath is the path where to look for the file
 * @param fileName is the filename
 * @returns {boolean}
 */
function fileExist (filePath, fileName) {
  const fileURI = path.join(filePath, fileName)

  return uriExist(fileURI)
}

/**
 * Check if the a file exists in a folder
 * @param uri is a complete identifier for a resource on the disk
 * @returns {boolean}
 */
function uriExist (uri) {
  if (fs.existsSync(uri)) {
    return true
  } else {
    return false
  }
}

/**
 * Returns all subdirectories
 * @param dir is the directory to look for subdirectories
 * @returns {*}
 */
function subDirectories (dir) {
  const subs = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory())

  return subs
}

/**
 * Returns all files in a directory
 * @param dir
 * @returns {*}
 */
function directoryFiles (dir) {
  const files = fs.readdirSync(dir)

  return files
}

function fileCopy (source, destination) {
  if (!uriExist(source)) {
    return false
  } else {
    try {
      fse.copySync(source, destination)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

function fileDelete (uri) {
  if (!uriExist(uri)) {
    // uri does not exist, delete is therefore successful
    return true
  } else {
    try {
      fse.removeSync(uri)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

module.exports = {
  writeFile: writeFileSync,
  readFileSync: readFileSync,
  fileExist: fileExist,
  uriExist: uriExist,
  fileCopy: fileCopy,
  fileDelete: fileDelete,

  subDirectories: subDirectories,
  directoryFiles: directoryFiles,

  mkdirSync: mkdirSync
}
