const assert = require('assert')
const pathHelper = require('../../../backend/src/helpers/pathHelper')
const fileHelper = require('../../../backend/src/helpers/fileHelper')

describe('TS: create file, check, and delete', () => {
  it('TC:  generate path', () => {
    const storagePath = pathHelper.storagePath('test', 'random')
    const content = 'just a simple random test string'
    const fileName = 'test.txt'

    // first check, the file does not exist
    assert.equal(fileHelper.fileExist(storagePath, fileName), false)

    // create the file
    fileHelper.writeFile(content, storagePath, fileName)

    // assert the file exists now
    assert.equal(fileHelper.fileExist(storagePath, fileName), true)

    // delete the file and assert a true response
    // TODO: inconsistent access via path + filename or URI ?
    assert.equal(fileHelper.fileDelete(storagePath + '/' + fileName), true)

    // now check, that the file does not exist anymore
    assert.equal(fileHelper.fileExist(storagePath, fileName), false)

    // delete the folder .../test/random
    assert.equal(fileHelper.fileDelete(storagePath), true)

    // now check, that the folder does not exist anymore
    assert.equal(fileHelper.uriExist(storagePath), false)

    // delete the folder .../test/
    assert.equal(fileHelper.fileDelete(pathHelper.storagePath('test')), true)

    // now check, that the folder does not exist anymore
    assert.equal(fileHelper.uriExist(pathHelper.storagePath('test')), false)
  })
})
