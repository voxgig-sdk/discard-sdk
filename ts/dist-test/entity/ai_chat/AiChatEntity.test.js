"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('AiChatEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DISCARD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DISCARD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DiscardSDK.test();
        const ent = testsdk.AiChat();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DISCARD_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ai_chat.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "context", "req": false, "short": "Optional conversation context", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "message", "req": true, "short": "The message to send to the AI", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "response", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "status", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "format": "date-time", "name": "timestamp", "req": false, "type": "`$STRING`", "index$": 4 }], "name": "ai_chat", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/chat", "json": "{\"operationId\":\"aiChat\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"context\":{\"description\":\"Optional conversation context\",\"items\":{\"properties\":{\"content\":{\"example\":\"Previous message\",\"type\":\"string\"},\"role\":{\"enum\":[\"user\",\"assistant\"],\"example\":\"user\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"message\":{\"description\":\"The message to send to the AI\",\"example\":\"Hello, how are you?\",\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"response\":{\"example\":\"I'm doing well, thank you for asking!\",\"type\":\"string\"},\"status\":{\"example\":\"success\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful AI response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"example\":\"An error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"example\":\"An error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/chat", "segments": [{ "lit": "api" }, { "lit": "chat" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "ai_chat", "name__orig": "ai_chat", "Name": "AiChat", "name_": "ai_chat", "name-": "ai-chat", "NAME": "AI_CHAT", "index$": 0 }, { "active": true, "entity": "ai_chat", "key$": "BasicAiChatFlow", "kind": "basic", "name": "BasicAiChatFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "ai_chat_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'AiChat');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const ai_chat_ref01_ent = client.AiChat();
        let ai_chat_ref01_data = setup.data.new.ai_chat['ai_chat_ref01'];
        ai_chat_ref01_data = (await ai_chat_ref01_ent.create(ai_chat_ref01_data)).data();
        (0, node_assert_1.default)(null != ai_chat_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ai_chat/AiChatTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DiscardSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ai_chat01', 'ai_chat02', 'ai_chat03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DISCARD_TEST_AI_CHAT_ENTID': idmap,
        'DISCARD_TEST_LIVE': 'FALSE',
        'DISCARD_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DISCARD_TEST_AI_CHAT_ENTID'];
    const live = 'TRUE' === env.DISCARD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DISCARD_TEST_AI_CHAT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.DiscardSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=AiChatEntity.test.js.map