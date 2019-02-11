const assert = require('assert')
const resourceReader = require('../../../backend/src/helpers/resourcesReader')

describe('TS: get resources as valid JSON from file', () => {
  it('TC:  get', () => {
    const res = resourceReader('all')

    try {
      JSON.parse(res)
    } catch (e) {
      assert.equal(true, false)
    }

    assert.equal(true, true)
  })
})
