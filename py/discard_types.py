# Typed models for the Discard SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class AiChat:
    message: str
    context: Optional[list] = None
    response: Optional[str] = None
    status: Optional[str] = None
    timestamp: Optional[str] = None


@dataclass
class AiChatCreateData:
    context: Optional[list] = None
    message: Optional[str] = None
    response: Optional[str] = None
    status: Optional[str] = None
    timestamp: Optional[str] = None


@dataclass
class Test:
    data: Optional[dict] = None
    id: Optional[str] = None
    message: Optional[str] = None
    received: Optional[dict] = None
    status: Optional[str] = None
    timestamp: Optional[str] = None
    update: Optional[dict] = None


@dataclass
class TestLoadMatch:
    data: Optional[dict] = None
    id: Optional[str] = None
    message: Optional[str] = None
    received: Optional[dict] = None
    status: Optional[str] = None
    timestamp: Optional[str] = None
    update: Optional[dict] = None


@dataclass
class TestCreateData:
    data: Optional[dict] = None
    id: Optional[str] = None
    message: Optional[str] = None
    received: Optional[dict] = None
    status: Optional[str] = None
    timestamp: Optional[str] = None
    update: Optional[dict] = None


@dataclass
class TestUpdateData:
    data: Optional[dict] = None
    id: Optional[str] = None
    message: Optional[str] = None
    received: Optional[dict] = None
    status: Optional[str] = None
    timestamp: Optional[str] = None
    update: Optional[dict] = None


@dataclass
class TestRemoveMatch:
    data: Optional[dict] = None
    id: Optional[str] = None
    message: Optional[str] = None
    received: Optional[dict] = None
    status: Optional[str] = None
    timestamp: Optional[str] = None
    update: Optional[dict] = None


@dataclass
class Testing:
    data: Optional[dict] = None
    filename: Optional[str] = None
    message: Optional[str] = None
    size: Optional[int] = None
    status: Optional[str] = None
    timestamp: Optional[str] = None


@dataclass
class TestingLoadMatch:
    data: Optional[dict] = None
    filename: Optional[str] = None
    message: Optional[str] = None
    size: Optional[int] = None
    status: Optional[str] = None
    timestamp: Optional[str] = None


@dataclass
class TestingCreateData:
    data: Optional[dict] = None
    filename: Optional[str] = None
    message: Optional[str] = None
    size: Optional[int] = None
    status: Optional[str] = None
    timestamp: Optional[str] = None

