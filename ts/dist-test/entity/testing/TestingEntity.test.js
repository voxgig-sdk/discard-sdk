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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active_endpoints": { "a": true, "h": "Active Endpoints", "n": "active_endpoints", "r": false, "t": "`$INTEGER`", "key$": "active_endpoints", "index$": 0 }, "filename": { "a": true, "h": "Filename", "n": "filename", "r": false, "t": "`$STRING`", "key$": "filename", "index$": 1 }, "inactive_endpoints": { "a": true, "h": "Inactive Endpoints", "n": "inactive_endpoints", "r": false, "t": "`$INTEGER`", "key$": "inactive_endpoints", "index$": 2 }, "message": { "a": true, "h": "Message", "n": "message", "r": false, "t": "`$STRING`", "key$": "message", "index$": 3 }, "period": { "a": true, "h": "Period", "n": "period", "r": false, "t": "`$STRING`", "key$": "period", "index$": 4 }, "size": { "a": true, "h": "Size", "n": "size", "r": false, "t": "`$INTEGER`", "key$": "size", "index$": 5 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 6 }, "timestamp": { "a": true, "fo": "date-time", "h": "Timestamp", "n": "timestamp", "r": false, "t": "`$STRING`", "key$": "timestamp", "index$": 7 }, "total_requests": { "a": true, "h": "Total Requests", "n": "total_requests", "r": false, "t": "`$INTEGER`", "key$": "total_requests", "index$": 8 } }, "name": "testing", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /api/upload", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/upload", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "upload" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/analytics", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "day", "k": "query", "n": "period", "or": "period", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/analytics", "q": { "exist": ["period"] }, "r": {}, "s": [{ "lit": "api" }, { "lit": "analytics" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "testing", "name__orig": "testing", "Name": "Testing", "name_": "testing", "name-": "testing", "NAME": "TESTING", "index$": 2 }, { "active": true, "entity": "testing", "key$": "BasicTestingFlow", "kind": "basic", "name": "BasicTestingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "testing_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "testing_ref01", "srcdatavar": "testing_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-testing_ref01" } }], "index$": 1 }] }, 'Testing', { "POST /api/upload": { "protocol": "http", "operationId": "uploadFile", "requestBody": { "required": true, "content": { "multipart/form-data": { "schema": { "type": "object", "properties": { "file": { "type": "string", "format": "binary", "description": "The file to upload" }, "description": { "type": "string", "description": "Optional description of the file" } }, "required": ["file"] } } } }, "responses": { "200": { "description": "File uploaded successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "example": "success", "key$": "status" }, "message": { "type": "string", "example": "File uploaded successfully", "key$": "message" }, "filename": { "type": "string", "example": "example.txt", "key$": "filename" }, "size": { "type": "integer", "example": 1024, "key$": "size" }, "timestamp": { "type": "string", "format": "date-time", "example": "2006-01-02 15:04:05", "key$": "timestamp" } }, "index$": 0 } } } }, "400": { "description": "Bad request - invalid file", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "example": "error" }, "message": { "type": "string", "example": "An error occurred" }, "code": { "type": "integer", "example": 400 }, "timestamp": { "type": "string", "format": "date-time", "example": "2006-01-02 15:04:05" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "securitySource": "unspecified" }, "GET /api/analytics": { "protocol": "http", "operationId": "getAnalytics", "responses": { "200": { "description": "Analytics data retrieved successfully", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "example": "success", "key$": "status", "type": "string" }, "data": { "key$": "data", "properties": { "active_endpoints": { "example": 5, "type": "integer", "key$": "active_endpoints" }, "inactive_endpoints": { "example": 0, "type": "integer", "key$": "inactive_endpoints" }, "period": { "example": "day", "type": "string", "key$": "period" }, "total_requests": { "example": 1250, "type": "integer", "key$": "total_requests" } }, "type": "object", "index$": 0 }, "timestamp": { "example": "2006-01-02 15:04:05", "format": "date-time", "key$": "timestamp", "type": "string" } } } } } } }, "parameters": [{ "name": "period", "in": "query", "description": "Time period for analytics (day, week, month)", "required": false, "schema": { "type": "string", "enum": ["day", "week", "month"], "default": "day" }, "index$": 0 }], "securitySource": "unspecified" } });
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