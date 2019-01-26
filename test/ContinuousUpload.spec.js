/* eslint-disable no-undef */
const assert = require('assert')
const os = require('os')
const ContinousUpload = require('../ContinuousUpload')

describe('Testing Continous Upload Class', () => {
  let contUpload
  beforeEach(() => {
    contUpload = new ContinousUpload('MOCK_USER', 'MOCK_SECRET', 'MOCK')
  })
  it('Type of contUpload should be a class', () => {
    assert.strictEqual(typeof (contUpload), 'object')
  })
  it('The constructor of contUpload should have correct values', () => {
    assert.strictEqual(contUpload.iam_user_key, 'MOCK_USER')
    assert.strictEqual(contUpload.iam_user_secret, 'MOCK_SECRET')
    assert.strictEqual(contUpload.bucket_name, 'MOCK')
    assert.strictEqual(contUpload.watcher, null)
  })
  it('getHomeDirectory should be MOCK', () => {
    let homeDir = os.homedir()
    assert.strictEqual(contUpload.getHomeDirectory(), `${homeDir}/Desktop/aws-MOCK`)
  })
  it('getHomeDirectory should be TESTING', () => {
    const testContUpload = new ContinousUpload('MOCK_USER', 'MOCK_SECRET', 'TESTING')
    let homeDir = os.homedir()
    assert.strictEqual(testContUpload.getHomeDirectory(), `${homeDir}/Desktop/aws-TESTING`)
  })
  it('watcherSetter should set watcher value in class constructor', () => {
    contUpload.watcherSetter()
    assert.strictEqual(contUpload.watcher, '')
  })
})
