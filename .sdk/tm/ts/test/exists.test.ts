
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DiscardSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DiscardSDK.test()
    equal(testsdk instanceof DiscardSDK, true,
      'DiscardSDK.test() must return a client synchronously')
  })

})
