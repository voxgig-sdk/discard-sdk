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
(0, node_test_1.describe)('TestingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when DISCARD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('DISCARD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.DiscardSDK.test();
        const ent = testsdk.Testing();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.DISCARD_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'testing.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "active_endpoints", "req": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "filename", "req": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "inactive_endpoints", "req": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "message", "req": false, "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "period", "req": false, "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "size", "req": false, "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "status", "req": false, "type": "`$STRING`", "index$": 6 }, { "active": true, "format": "date-time", "name": "timestamp", "req": false, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "total_requests", "req": false, "type": "`$INTEGER`", "index$": 8 }], "name": "testing", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/upload", "json": "{\"operationId\":\"uploadFile\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"multipart/form-data\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Optional description of the file\",\"type\":\"string\"},\"file\":{\"description\":\"The file to upload\",\"format\":\"binary\",\"type\":\"string\"}},\"required\":[\"file\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"filename\":{\"example\":\"example.txt\",\"type\":\"string\"},\"message\":{\"example\":\"File uploaded successfully\",\"type\":\"string\"},\"size\":{\"example\":1024,\"type\":\"integer\"},\"status\":{\"example\":\"success\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"File uploaded successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"example\":400,\"type\":\"integer\"},\"message\":{\"example\":\"An error occurred\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid file\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/upload", "segments": [{ "lit": "api" }, { "lit": "upload" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "day", "kind": "query", "name": "period", "orig": "period", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /api/analytics", "json": "{\"operationId\":\"getAnalytics\",\"parameters\":[{\"description\":\"Time period for analytics (day, week, month)\",\"in\":\"query\",\"name\":\"period\",\"required\":false,\"schema\":{\"default\":\"day\",\"enum\":[\"day\",\"week\",\"month\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"properties\":{\"active_endpoints\":{\"example\":5,\"type\":\"integer\"},\"inactive_endpoints\":{\"example\":0,\"type\":\"integer\"},\"period\":{\"example\":\"day\",\"type\":\"string\"},\"total_requests\":{\"example\":1250,\"type\":\"integer\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"},\"timestamp\":{\"example\":\"2006-01-02 15:04:05\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Analytics data retrieved successfully\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/analytics", "segments": [{ "lit": "api" }, { "lit": "analytics" }], "select": { "exist": ["period"] }, "transform": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "testing", "name__orig": "testing", "Name": "Testing", "name_": "testing", "name-": "testing", "NAME": "TESTING", "index$": 2 }, { "active": true, "entity": "testing", "key$": "BasicTestingFlow", "kind": "basic", "name": "BasicTestingFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "testing_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "testing_ref01", "srcdatavar": "testing_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-testing_ref01" } }], "index$": 1 }] }, 'Testing');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const testing_ref01_ent = client.Testing();
        let testing_ref01_data = setup.data.new.testing['testing_ref01'];
        testing_ref01_data = (await testing_ref01_ent.create(testing_ref01_data)).data();
        (0, node_assert_1.default)(null != testing_ref01_data);
        // LOAD
        const testing_ref01_match_dt0 = {};
        const testing_ref01_data_dt0 = (await testing_ref01_ent.load(testing_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != testing_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/testing/TestingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.DiscardSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['testing01', 'testing02', 'testing03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'DISCARD_TEST_TESTING_ENTID': idmap,
        'DISCARD_TEST_LIVE': 'FALSE',
        'DISCARD_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['DISCARD_TEST_TESTING_ENTID'];
    const live = 'TRUE' === env.DISCARD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['DISCARD_TEST_TESTING_ENTID'];
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
//# sourceMappingURL=TestingEntity.test.js.map