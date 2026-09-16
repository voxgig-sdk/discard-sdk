

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


describe('AiChatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when DISCARD_TEST_LIVE=TRUE.
  afterEach(liveDelay('DISCARD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = DiscardSDK.test()
    const ent = testsdk.AiChat()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.DISCARD_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ai_chat.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"context","req":false,"short":"Optional conversation context","type":"`$ARRAY`","index$":0},{"active":true,"name":"message","req":true,"short":"The message to send to the AI","type":"`$STRING`","index$":1},{"active":true,"name":"response","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":3},{"active":true,"format":"date-time","name":"timestamp","req":false,"type":"`$STRING`","index$":4}],"name":"ai_chat","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /api/chat","json":"{\"operationId\":\"aiChat\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"context\":{\"description\":\"Optional conversation context\",\"items\":{\"properties\":{\"content\":{\"example\":\"Previous message\",\"type\":\"string\"},\"role\":{\"enum\":[\"user\",\"assistant\"],\"example\":\"user\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"The message to send to the AI\",\"example\":\"Hello, how are you?\",\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"response\":{\"example\":\"I'm doing well, thank you for asking!\",\"type\":\"string\"},\"status\":{\"example\":\"success\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful AI response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"example\":\"An error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"example\":\"An error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/api/chat","segments":[{"lit":"api"},{"lit":"chat"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"ai_chat","name__orig":"ai_chat","Name":"AiChat","name_":"ai_chat","name-":"ai-chat","NAME":"AI_CHAT","index$":0}, {"active":true,"entity":"ai_chat","key$":"BasicAiChatFlow","kind":"basic","name":"BasicAiChatFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"ai_chat_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'AiChat')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const ai_chat_ref01_ent = client.AiChat()
    let ai_chat_ref01_data = setup.data.new.ai_chat['ai_chat_ref01']

    ai_chat_ref01_data = (await ai_chat_ref01_ent.create(ai_chat_ref01_data)).data()
    assert(null != ai_chat_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ai_chat/AiChatTestData.json')

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
    ['ai_chat01','ai_chat02','ai_chat03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'DISCARD_TEST_AI_CHAT_ENTID': idmap,
    'DISCARD_TEST_LIVE': 'FALSE',
    'DISCARD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['DISCARD_TEST_AI_CHAT_ENTID']

  const live = 'TRUE' === env.DISCARD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['DISCARD_TEST_AI_CHAT_ENTID']
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
  
