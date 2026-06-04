# Discard SDK

REST API playground with LLM chat, image editing, news, search and download endpoints, built in Go

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About DISCARD API

DISCARD API is a public REST API platform maintained by [GlobalTechInfo](https://github.com/GlobalTechInfo/discard-api). It is built in Go on top of the Fiber web framework and exposes a large catalogue of utility endpoints aimed at developers who want to experiment with HTTP requests, AI chat, and media tooling without standing up their own backend.

What you get from the API:
- A broad collection of REST endpoints covering LLM / AI chat, image editing (Ephoto 360), news aggregation, search, download and generation utilities
- Support for the usual HTTP verbs (GET, POST, PUT, PATCH, DELETE) with parameter forms for quick testing
- File uploads and JSON request bodies for endpoints that need them
- Usage analytics and a changelog surfaced from the project's own dashboard

Operational notes: the service is listed on [Free Public APIs](https://freepublicapis.com/discard-api), which reports it as healthy on daily checks. CORS is disabled, so browser-side calls from another origin will need a proxy. No authentication or published rate-limit policy is documented on the homepage or catalogue listing.

## Try it

**TypeScript**
```bash
npm install discard
```

**Python**
```bash
pip install discard-sdk
```

**PHP**
```bash
composer require voxgig/discard-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/discard-sdk/go
```

**Ruby**
```bash
gem install discard-sdk
```

**Lua**
```bash
luarocks install discard-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { DiscardSDK } from 'discard'

const client = new DiscardSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o discard-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "discard": {
      "command": "/abs/path/to/discard-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **AiChat** | LLM-backed chat endpoints exposed by the platform's AI Chat category for sending prompts and receiving model responses. | `/api/chat` |
| **Test** | Generic HTTP test endpoints used to exercise GET/POST/PUT/PATCH/DELETE behaviour with parameter forms and JSON bodies. | `/api/test` |
| **Testing** | Related testing and diagnostic endpoints surfaced alongside the platform's request-builder tooling. | `/api/upload` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from discard_sdk import DiscardSDK

client = DiscardSDK({})

```

### PHP

```php
<?php
require_once 'discard_sdk.php';

$client = new DiscardSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/discard-sdk/go"

client := sdk.NewDiscardSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Discard_sdk"

client = DiscardSDK.new({})

```

### Lua

```lua
local sdk = require("discard_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = DiscardSDK.test()
const result = await client.AiChat().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = DiscardSDK.test(None, None)
result, err = client.AiChat(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = DiscardSDK::test(null, null);
[$result, $err] = $client->AiChat(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.AiChat(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = DiscardSDK.test(nil, nil)
result, err = client.AiChat(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:AiChat(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the DISCARD API

- Upstream: [https://discardapi.dpdns.org](https://discardapi.dpdns.org)

---

Generated from the DISCARD API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
