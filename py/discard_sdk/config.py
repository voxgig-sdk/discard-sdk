# Discard SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Discard",
            "slug": "discard",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://discardapi.dpdns.org",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "ai_chat": {},
                "test": {},
                "testing": {},
            },
        },
        "entity": {
      "ai_chat": {
        "fields": [
          {
            "name": "context",
            "title": "Context",
            "type": "`$ARRAY`",
            "short": "Optional conversation context",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
            "req": True,
            "short": "The message to send to the AI",
          },
          {
            "name": "response",
            "title": "Response",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$STRING`",
            "format": "date-time",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "chat",
                  },
                ],
                "parts": [
                  "api",
                  "chat",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "test": {
        "fields": [
          {
            "name": "data",
            "title": "Data",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "updates",
            "title": "Updates",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
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
                    "lit": "api",
                  },
                  {
                    "lit": "test",
                  },
                ],
                "parts": [
                  "api",
                  "test",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.received`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "api",
                  },
                  {
                    "lit": "test",
                  },
                ],
                "parts": [
                  "api",
                  "test",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "api",
                  },
                  {
                    "lit": "test",
                  },
                ],
                "parts": [
                  "api",
                  "test",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "api",
                  },
                  {
                    "lit": "test",
                  },
                ],
                "parts": [
                  "api",
                  "test",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$STRING`",
                      "kind": "query",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
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
                    "lit": "api",
                  },
                  {
                    "lit": "test",
                  },
                ],
                "parts": [
                  "api",
                  "test",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "testing": {
        "fields": [
          {
            "name": "active_endpoints",
            "title": "Active Endpoints",
            "type": "`$INTEGER`",
          },
          {
            "name": "filename",
            "title": "Filename",
            "type": "`$STRING`",
          },
          {
            "name": "inactive_endpoints",
            "title": "Inactive Endpoints",
            "type": "`$INTEGER`",
          },
          {
            "name": "message",
            "title": "Message",
            "type": "`$STRING`",
          },
          {
            "name": "period",
            "title": "Period",
            "type": "`$STRING`",
          },
          {
            "name": "size",
            "title": "Size",
            "type": "`$INTEGER`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "timestamp",
            "title": "Timestamp",
            "type": "`$STRING`",
            "format": "date-time",
          },
          {
            "name": "total_requests",
            "title": "Total Requests",
            "type": "`$INTEGER`",
          },
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
                    "lit": "api",
                  },
                  {
                    "lit": "upload",
                  },
                ],
                "parts": [
                  "api",
                  "upload",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
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
                    "lit": "api",
                  },
                  {
                    "lit": "analytics",
                  },
                ],
                "parts": [
                  "api",
                  "analytics",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "args": {
                  "query": [
                    {
                      "name": "period",
                      "orig": "period",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "day",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "period",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
