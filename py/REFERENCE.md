# Discard Python SDK Reference

Complete API reference for the Discard Python SDK.


## DiscardSDK

### Constructor

```python
from discard_sdk import DiscardSDK

client = DiscardSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DiscardSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = DiscardSDK.test()
```


### Instance Methods

#### `AiChat(data=None)`

Create a new `AiChatEntity` instance. Pass `None` for no initial data.

#### `Test(data=None)`

Create a new `TestEntity` instance. Pass `None` for no initial data.

#### `Testing(data=None)`

Create a new `TestingEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AiChatEntity

```python
ai_chat = client.ai_chat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | ``$ARRAY`` | No |  |
| `message` | ``$STRING`` | Yes |  |
| `response` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `timestamp` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ai_chat.create({
    "message": # `$STRING`,
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AiChatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TestEntity

```python
test = client.test
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | No |  |
| `id` | ``$STRING`` | No |  |
| `message` | ``$STRING`` | No |  |
| `received` | ``$OBJECT`` | No |  |
| `status` | ``$STRING`` | No |  |
| `timestamp` | ``$STRING`` | No |  |
| `update` | ``$OBJECT`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.test.create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.test.load({"id": "test_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.test.remove({"id": "test_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.test.update({
    "id": "test_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TestEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TestingEntity

```python
testing = client.testing
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$OBJECT`` | No |  |
| `filename` | ``$STRING`` | No |  |
| `message` | ``$STRING`` | No |  |
| `size` | ``$INTEGER`` | No |  |
| `status` | ``$STRING`` | No |  |
| `timestamp` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.testing.create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.testing.load({"id": "testing_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TestingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = DiscardSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

