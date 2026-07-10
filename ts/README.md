# Discard TypeScript SDK



The TypeScript SDK for the Discard API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.AiChat()` — each with a small set of operations (`load`, `create`, `update`, `remove`, `patch`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/discard-sdk/releases](https://github.com/voxgig-sdk/discard-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { DiscardSDK } from '@voxgig-sdk/discard'

const client = new DiscardSDK()
```

### 4. Create, update, and remove

```ts
// Create — returns the created AiChat
const created = await client.AiChat().create({
  message: 'example_message',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const test = await client.Test().load({ id: "example_id" })
  console.log(test)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = DiscardSDK.test()

const test = await client.Test().load({ id: 'test01' })
// test is a bare entity populated with mock response data
console.log(test)
```

You can also use the instance method:

```ts
const client = new DiscardSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Test()

// First call runs the operation and stores its result
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new DiscardSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DISCARD_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### DiscardSDK

#### Constructor

```ts
new DiscardSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `AiChat(data?)` | `AiChatEntity` | Create an AiChat entity instance. |
| `Test(data?)` | `TestEntity` | Create a Test entity instance. |
| `Testing(data?)` | `TestingEntity` | Create a Testing entity instance. |
| `tester(testopts?, sdkopts?)` | `DiscardSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `DiscardSDK.test(testopts?, sdkopts?)` | `DiscardSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DiscardSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### AiChat

| Field | Description |
| --- | --- |
| `context` |  |
| `message` |  |
| `response` |  |
| `status` |  |
| `timestamp` |  |

Operations: create.

API path: `/api/chat`

#### Test

| Field | Description |
| --- | --- |
| `data` |  |
| `id` |  |
| `message` |  |
| `received` |  |
| `status` |  |
| `timestamp` |  |
| `update` |  |

Operations: create, load, patch, remove, update.

API path: `/api/test`

#### Testing

| Field | Description |
| --- | --- |
| `data` |  |
| `filename` |  |
| `message` |  |
| `size` |  |
| `status` |  |
| `timestamp` |  |

Operations: create, load.

API path: `/api/upload`



## Entities


### AiChat

Create an instance: `const ai_chat = client.AiChat()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `context` | `any[]` |  |
| `message` | `string` |  |
| `response` | `string` |  |
| `status` | `string` |  |
| `timestamp` | `string` |  |

#### Example: Create

```ts
const ai_chat = await client.AiChat().create({
  message: 'example_message',
})
```


### Test

Create an instance: `const test = client.Test()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Record<string, any>` |  |
| `id` | `string` |  |
| `message` | `string` |  |
| `received` | `Record<string, any>` |  |
| `status` | `string` |  |
| `timestamp` | `string` |  |
| `update` | `Record<string, any>` |  |

#### Example: Load

```ts
const test = await client.Test().load({ id: 'test_id' })
```

#### Example: Create

```ts
const test = await client.Test().create({
})
```


### Testing

Create an instance: `const testing = client.Testing()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Record<string, any>` |  |
| `filename` | `string` |  |
| `message` | `string` |  |
| `size` | `number` |  |
| `status` | `string` |  |
| `timestamp` | `string` |  |

#### Example: Load

```ts
const testing = await client.Testing().load()
```

#### Example: Create

```ts
const testing = await client.Testing().create({
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
discard/
├── src/
│   ├── DiscardSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { DiscardSDK } from '@voxgig-sdk/discard'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const test = client.Test()
await test.load({ id: "example_id" })

// test.data() now returns the test data from the last `load`
// test.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
