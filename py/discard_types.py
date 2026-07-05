# Typed models for the Discard SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AiChatRequired(TypedDict):
    message: str


class AiChat(AiChatRequired, total=False):
    context: list
    response: str
    status: str
    timestamp: str


class AiChatCreateDataRequired(TypedDict):
    message: str


class AiChatCreateData(AiChatCreateDataRequired, total=False):
    context: list
    response: str
    status: str
    timestamp: str


class Test(TypedDict, total=False):
    data: dict
    id: str
    message: str
    received: dict
    status: str
    timestamp: str
    update: dict


class TestLoadMatchRequired(TypedDict):
    id: str


class TestLoadMatch(TestLoadMatchRequired, total=False):
    data: dict
    message: str
    received: dict
    status: str
    timestamp: str
    update: dict


class TestCreateData(TypedDict, total=False):
    data: dict
    id: str
    message: str
    received: dict
    status: str
    timestamp: str
    update: dict


class TestUpdateData(TypedDict, total=False):
    data: dict
    id: str
    message: str
    received: dict
    status: str
    timestamp: str
    update: dict


class TestRemoveMatchRequired(TypedDict):
    id: str


class TestRemoveMatch(TestRemoveMatchRequired, total=False):
    data: dict
    message: str
    received: dict
    status: str
    timestamp: str
    update: dict


class Testing(TypedDict, total=False):
    data: dict
    filename: str
    message: str
    size: int
    status: str
    timestamp: str


class TestingLoadMatch(TypedDict, total=False):
    data: dict
    filename: str
    message: str
    size: int
    status: str
    timestamp: str


class TestingCreateData(TypedDict, total=False):
    data: dict
    filename: str
    message: str
    size: int
    status: str
    timestamp: str
