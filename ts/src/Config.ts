
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Discard',
        slug: "discard",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://discardapi.dpdns.org",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        ai_chat: {
        },
  
        test: {
        },
  
        testing: {
        },
  
    }
  }


  entity = {
    "ai_chat": {
      "fields": [
        {
          "name": "context",
          "title": "Context",
          "type": "`$ARRAY`",
          "short": "Optional conversation context"
        },
        {
          "name": "message",
          "title": "Message",
          "type": "`$STRING`",
          "req": true,
          "short": "The message to send to the AI"
        },
        {
          "name": "response",
          "title": "Response",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`"
        },
        {
          "name": "timestamp",
          "title": "Timestamp",
          "type": "`$STRING`",
          "format": "date-time"
        }
      ],
      "name": "ai_chat",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
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
              "parts": [
                "api",
                "chat"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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
          "title": "Data",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "message",
          "title": "Message",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`"
        },
        {
          "name": "timestamp",
          "title": "Timestamp",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "updates",
          "title": "Updates",
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
              "parts": [
                "api",
                "test"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.received`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
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
              "parts": [
                "api",
                "test"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "patch": {
          "input": "data",
          "name": "patch",
          "points": [
            {
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
              "parts": [
                "api",
                "test"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
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
              "parts": [
                "api",
                "test"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "update": {
          "input": "data",
          "name": "update",
          "points": [
            {
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
              "parts": [
                "api",
                "test"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
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
          "title": "Active Endpoints",
          "type": "`$INTEGER`"
        },
        {
          "name": "filename",
          "title": "Filename",
          "type": "`$STRING`"
        },
        {
          "name": "inactive_endpoints",
          "title": "Inactive Endpoints",
          "type": "`$INTEGER`"
        },
        {
          "name": "message",
          "title": "Message",
          "type": "`$STRING`"
        },
        {
          "name": "period",
          "title": "Period",
          "type": "`$STRING`"
        },
        {
          "name": "size",
          "title": "Size",
          "type": "`$INTEGER`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`"
        },
        {
          "name": "timestamp",
          "title": "Timestamp",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "total_requests",
          "title": "Total Requests",
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
              "parts": [
                "api",
                "upload"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
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
              "parts": [
                "api",
                "analytics"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "period",
                    "orig": "period",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "day"
                  }
                ]
              },
              "select": {
                "exist": [
                  "period"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

