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
 * Maps the file extension to the corresponding Fontawesome icon
 * @param fileName
 * @returns {string}
 */
export const fileExtensionIcon = (fileName) => {
  const ext = fileName.split('.').pop()
  let icon = 'fa fa-fw fa-file'
  switch (ext) {
    case 'txt':
    case 'cfg':
    case 'log':
      icon = 'fa fa-fw fa-file-text'
      break
    case 'pdf':
      icon = 'fa fa-fw fa-file-pdf-o'
      break
    case 'pcapng':
      icon = 'fa fa-fw fa-file'
  }

  return icon
}

export const folderIcon = () => {
  return 'fa fa-fw fa-folder'
}
