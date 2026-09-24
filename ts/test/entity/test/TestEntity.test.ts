

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { DiscardSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TestEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DISCARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('DISCARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DiscardSDK.test()
    const ent = testsdk.Test()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DISCARD_TEST_LIVE
    for (const op of ['create', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'test.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$OBJECT`","key$":"data","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"message":{"a":true,"h":"Message","n":"message","r":false,"t":"`$STRING`","key$":"message","index$":2},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":3},"timestamp":{"a":true,"fo":"date-time","h":"Timestamp","n":"timestamp","r":false,"t":"`$STRING`","key$":"timestamp","index$":4},"updates":{"a":true,"h":"Updates","n":"updates","r":false,"t":"`$OBJECT`","key$":"updates","index$":5}},"id":{"field":"id","name":"id"},"name":"test","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/test","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/test","q":{},"r":{},"s":[{"lit":"api"},{"lit":"test"}],"t":{"req":"`reqdata`","res":"`body.received`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/test","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/api/test","q":{},"r":{},"s":[{"lit":"api"},{"lit":"test"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"co":{"id":"PATCH /api/test","source":"openapi3","version":2},"g":{},"k":"http","m":"PATCH","o":"/api/test","q":{},"r":{},"s":[{"lit":"api"},{"lit":"test"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /api/test","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"id","or":"id","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/api/test","q":{"exist":["id"]},"r":{},"s":[{"lit":"api"},{"lit":"test"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /api/test","source":"openapi3","version":2},"g":{},"k":"http","m":"PUT","o":"/api/test","q":{},"r":{},"s":[{"lit":"api"},{"lit":"test"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"test","name__orig":"test","Name":"Test","name_":"test","name-":"test","NAME":"TEST","index$":1}, {"active":true,"entity":"test","key$":"BasicTestFlow","kind":"basic","name":"BasicTestFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"test_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"test_ref01","srcdatavar":"test_ref01_data","suffix":"_up0","textfield":"message"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-test_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"test_ref01","srcdatavar":"test_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-test_ref01"}}],"index$":2},{"a":true,"d":{},"i":{"ref":"test_ref01","suffix":"_rm0"},"m":{},"o":"remove","s":[],"v":[],"index$":3}]}, 'Test', {"POST /api/test":{"protocol":"http","operationId":"testPost","requestBody":{"description":"Request body for POST test","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"message":{"type":"string","example":"Test message","key$":"message"},"data":{"type":"object","additionalProperties":true,"key$":"data"}},"index$":1}}}},"responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"success"},"message":{"type":"string","example":"POST request successful"},"received":{"type":"object","additionalProperties":true,"index$":0},"timestamp":{"type":"string","format":"date-time","example":"2006-01-02 15:04:05"}}}}}},"400":{"description":"Bad request","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"An error occurred"},"code":{"type":"integer","example":400},"timestamp":{"type":"string","format":"date-time","example":"2006-01-02 15:04:05"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"An error occurred"},"code":{"type":"integer","example":400},"timestamp":{"type":"string","format":"date-time","example":"2006-01-02 15:04:05"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"GET /api/test":{"protocol":"http","operationId":"testGet","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"example":"success","key$":"status","type":"string"},"message":{"example":"GET request successful","key$":"message","type":"string"},"timestamp":{"example":"2006-01-02 15:04:05","format":"date-time","key$":"timestamp","type":"string"}},"index$":0}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"An error occurred"},"code":{"type":"integer","example":400},"timestamp":{"type":"string","format":"date-time","example":"2006-01-02 15:04:05"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"PATCH /api/test":{"protocol":"http","operationId":"testPatch","requestBody":{"description":"Request body for PATCH test","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","example":"123","key$":"id"},"updates":{"type":"object","additionalProperties":true,"key$":"updates"}},"index$":1}}}},"responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"success","key$":"status"},"message":{"type":"string","example":"PATCH request successful","key$":"message"},"timestamp":{"type":"string","format":"date-time","example":"2006-01-02 15:04:05","key$":"timestamp"}},"index$":0}}}},"400":{"description":"Bad request","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"An error occurred"},"code":{"type":"integer","example":400},"timestamp":{"type":"string","format":"date-time","example":"2006-01-02 15:04:05"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"},"DELETE /api/test":{"protocol":"http","operationId":"testDelete","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"success"},"message":{"type":"string","example":"DELETE request successful"},"timestamp":{"type":"string","format":"date-time","example":"2006-01-02 15:04:05"}}}}}},"404":{"description":"Resource not found","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"An error occurred"},"code":{"type":"integer","example":400},"timestamp":{"type":"string","format":"date-time","example":"2006-01-02 15:04:05"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"id","in":"query","description":"ID of the resource to delete","required":false,"schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"},"PUT /api/test":{"protocol":"http","operationId":"testPut","requestBody":{"description":"Request body for PUT test","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"string","example":"123","key$":"id"},"data":{"type":"object","additionalProperties":true,"key$":"data"}},"index$":1}}}},"responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"success","key$":"status"},"message":{"type":"string","example":"PUT request successful","key$":"message"},"timestamp":{"type":"string","format":"date-time","example":"2006-01-02 15:04:05","key$":"timestamp"}},"index$":0}}}},"400":{"description":"Bad request","content":{"application/json":{"schema":{"type":"object","properties":{"status":{"type":"string","example":"error"},"message":{"type":"string","example":"An error occurred"},"code":{"type":"integer","example":400},"timestamp":{"type":"string","format":"date-time","example":"2006-01-02 15:04:05"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const test_ref01_ent = client.Test()
    let test_ref01_data = setup.data.new.test['test_ref01']

    test_ref01_data = (await test_ref01_ent.create(test_ref01_data)).data()
    assert(null != test_ref01_data.id)


    // UPDATE
    const test_ref01_data_up0: any = {}
    test_ref01_data_up0.id = test_ref01_data.id

    const test_ref01_markdef_up0 = { name: 'message', value: 'Mark01-test_ref01_' + setup.now }
    ;(test_ref01_data_up0 as any)[test_ref01_markdef_up0.name] = test_ref01_markdef_up0.value

    const test_ref01_resdata_up0 = (await test_ref01_ent.update(test_ref01_data_up0)).data()
    assert(test_ref01_resdata_up0.id === test_ref01_data_up0.id)

    assert((test_ref01_resdata_up0 as any)[test_ref01_markdef_up0.name] === test_ref01_markdef_up0.value)


    // LOAD
    const test_ref01_match_dt0: any = {}
    test_ref01_match_dt0.id = test_ref01_data.id
    const test_ref01_data_dt0 = (await test_ref01_ent.load(test_ref01_match_dt0)).data()
    assert(test_ref01_data_dt0.id === test_ref01_data.id)


    // REMOVE
    const test_ref01_match_rm0: any = { id: test_ref01_data.id }
    await test_ref01_ent.remove(test_ref01_match_rm0)
  

  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/test/TestTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = DiscardSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['test01','test02','test03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DISCARD_TEST_TEST_ENTID': idmap,
    'DISCARD_TEST_LIVE': 'FALSE',
    'DISCARD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DISCARD_TEST_TEST_ENTID']

  const live = 'TRUE' === env.DISCARD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DISCARD_TEST_TEST_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new DiscardSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.DISCARD_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
