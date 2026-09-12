"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Discard',
        slug: "discard",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://discardapi.dpdns.org",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            ai_chat: {},
            test: {},
            testing: {},
        }
    };
    entity = {
        "ai_chat": {
            "fields": [
                {
                    "name": "context",
                    "short": "Optional conversation context",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "message",
                    "req": true,
                    "short": "The message to send to the AI",
                    "type": "`$STRING`"
                },
                {
                    "name": "response",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "timestamp",
                    "type": "`$STRING`"
                }
            ],
            "name": "ai_chat",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/chat",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "chat"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "chat"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "test": {
            "fields": [
                {
                    "name": "data",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "message",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "timestamp",
                    "type": "`$STRING`"
                },
                {
                    "name": "updates",
                    "type": "`$OBJECT`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "test",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/test",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "test"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.received`"
                            },
                            "parts": [
                                "api",
                                "test"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/test",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "test"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "test"
                            ]
                        }
                    ]
                },
                "patch": {
                    "input": "data",
                    "name": "patch",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "PATCH",
                            "orig": "/api/test",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "test"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "test"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "kind": "query",
                                        "name": "id",
                                        "orig": "id",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/api/test",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "test"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "test"
                            ]
                        }
                    ]
                },
                "update": {
                    "input": "data",
                    "name": "update",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "PUT",
                            "orig": "/api/test",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "test"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "test"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "testing": {
            "fields": [
                {
                    "name": "active_endpoints",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "filename",
                    "type": "`$STRING`"
                },
                {
                    "name": "inactive_endpoints",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "message",
                    "type": "`$STRING`"
                },
                {
                    "name": "period",
                    "type": "`$STRING`"
                },
                {
                    "name": "size",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "format": "date-time",
                    "name": "timestamp",
                    "type": "`$STRING`"
                },
                {
                    "name": "total_requests",
                    "type": "`$INTEGER`"
                }
            ],
            "name": "testing",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/api/upload",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "upload"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "upload"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "day",
                                        "kind": "query",
                                        "name": "period",
                                        "orig": "period",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/analytics",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "analytics"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "period"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.data`"
                            },
                            "parts": [
                                "api",
                                "analytics"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map