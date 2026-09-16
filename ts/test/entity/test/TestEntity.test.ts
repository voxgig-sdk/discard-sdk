

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"message","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":3},{"active":true,"format":"date-time","name":"timestamp","req":false,"type":"`$STRING`","index$":4},{"active":true,"name":"updates","req":false,"type":"`$OBJECT`","index$":5}],"id":{"field":"id","name":"id"},"name":"test","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/test","json":"{\"operationId\":\"testPost\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"type\":\"object\"},\"message\":{\"example\":\"Test message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Request body for POST test\",\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"POST request successful\",\"type\":\"string\"},\"received\":{\"additionalProperties\":true,\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"example\":\"An error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"example\":\"An error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/test","segments":[{"lit":"api"},{"lit":"test"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.received`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{},"contract":{"id":"GET /api/test","json":"{\"operationId\":\"testGet\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"GET request successful\",\"type\":\"string\"},\"status\":{\"example\":\"success\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"example\":\"An error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/test","segments":[{"lit":"api"},{"lit":"test"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"active":true,"args":{},"contract":{"id":"PATCH /api/test","json":"{\"operationId\":\"testPatch\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"example\":\"123\",\"type\":\"string\"},\"updates\":{\"additionalProperties\":true,\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Request body for PATCH test\",\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"PATCH request successful\",\"type\":\"string\"},\"status\":{\"example\":\"success\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"example\":\"An error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/api/test","segments":[{"lit":"api"},{"lit":"test"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"id","orig":"id","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /api/test","json":"{\"operationId\":\"testDelete\",\"parameters\":[{\"description\":\"ID of the resource to delete\",\"in\":\"query\",\"name\":\"id\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"DELETE request successful\",\"type\":\"string\"},\"status\":{\"example\":\"success\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"example\":\"An error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Resource not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/api/test","segments":[{"lit":"api"},{"lit":"test"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{},"contract":{"id":"PUT /api/test","json":"{\"operationId\":\"testPut\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"additionalProperties\":true,\"type\":\"object\"},\"id\":{\"example\":\"123\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Request body for PUT test\",\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"message\":{\"example\":\"PUT request successful\",\"type\":\"string\"},\"status\":{\"example\":\"success\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"example\":\"An error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/api/test","segments":[{"lit":"api"},{"lit":"test"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"test","name__orig":"test","Name":"Test","name_":"test","name-":"test","NAME":"TEST","index$":1}, {"active":true,"entity":"test","key$":"BasicTestFlow","kind":"basic","name":"BasicTestFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"test_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"test_ref01","srcdatavar":"test_ref01_data","suffix":"_up0","textfield":"message"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-test_ref01"}}],"valid":[],"index$":1},{"active":true,"data":{},"input":{"ref":"test_ref01","srcdatavar":"test_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-test_ref01"}}],"index$":2},{"active":true,"data":{},"input":{"ref":"test_ref01","suffix":"_rm0"},"match":{},"op":"remove","spec":[],"valid":[],"index$":3}]}, 'Test')
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
  
