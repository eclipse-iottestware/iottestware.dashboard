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
const path = require('path')

/**
 * is the base folder: iottestware.webserver/backend/
 */
const baseFolder = path.join(__dirname, '/../../')

/**
 * is the base path where dynamic files will be stored or read
 */
const basePathStorage = path.join(baseFolder, 'resources/history')

/**
 * is the base path where static files will be read from
 */
const basePathResources = path.join(baseFolder, 'resources')

/**
 * is the base path where binaries will be placed
 */
const basePathBinaries = path.join(baseFolder, 'bin')

/**
 * is the base path where roboto fonts are installed via npm install roboto-fontface
 */
const basePathFonts = path.join(baseFolder, '/../node_modules/roboto-fontface/fonts/roboto')

/**
 * Abstracts the painful work with paths and allows consistent storage of all files below the basePathStorage
 *
 * @param args are single tokens which will be concatenated to a path
 * @returns the absolute path on your filesystem below the basePathStorage
 */
const storagePath = (...args) => {
  const sp = customPath(basePathStorage, ...args)

  return sp
}

const resourcesPath = (...args) => {
  return customPath(basePathResources, ...args)
}

const fontsPath = (font) => {
  return path.join(basePathFonts, font)
}

const binariesPath = (binary) => {
  return path.join(basePathBinaries, binary)
}

const customPath = (basePath, ...args) => {
  let returnPath = basePath

  if (args.length > 0) {
    const argsArray = Array.from(args)

    argsArray.forEach(item => {
      returnPath = path.join(returnPath, item.toString())
    })
  }

  return returnPath
}

module.exports = {
  binariesPath: binariesPath,
  storagePath: storagePath,
  resourcesPath: resourcesPath,
  fontsPath: fontsPath
}
