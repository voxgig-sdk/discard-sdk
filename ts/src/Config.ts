
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Discard',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$ARRAY`"
        },
        {
          "name": "message",
          "req": true,
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
              "parts": [
                "api",
                "chat"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "name": "timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "updates",
          "type": "`$OBJECT`"
        }
      ],
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
              "parts": [
                "api",
                "test"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.received`"
              }
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
              "parts": [
                "api",
                "test"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "test"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "test"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "test"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "upload"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "api",
                "analytics"
              ],
              "select": {
                "exist": [
                  "period"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
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
  config
}

