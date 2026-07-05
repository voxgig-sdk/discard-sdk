<?php
declare(strict_types=1);

// Typed models for the Discard SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AiChat entity data model. */
class AiChat
{
    public ?array $context = null;
    public string $message;
    public ?string $response = null;
    public ?string $status = null;
    public ?string $timestamp = null;
}

/** Request payload for AiChat#create. */
class AiChatCreateData
{
    public ?array $context = null;
    public string $message;
    public ?string $response = null;
    public ?string $status = null;
    public ?string $timestamp = null;
}

/** Test entity data model. */
class Test
{
    public ?array $data = null;
    public ?string $id = null;
    public ?string $message = null;
    public ?array $received = null;
    public ?string $status = null;
    public ?string $timestamp = null;
    public ?array $update = null;
}

/** Request payload for Test#load. */
class TestLoadMatch
{
    public ?array $data = null;
    public string $id;
    public ?string $message = null;
    public ?array $received = null;
    public ?string $status = null;
    public ?string $timestamp = null;
    public ?array $update = null;
}

/** Request payload for Test#create. */
class TestCreateData
{
    public ?array $data = null;
    public ?string $id = null;
    public ?string $message = null;
    public ?array $received = null;
    public ?string $status = null;
    public ?string $timestamp = null;
    public ?array $update = null;
}

/** Request payload for Test#update. */
class TestUpdateData
{
    public ?array $data = null;
    public ?string $id = null;
    public ?string $message = null;
    public ?array $received = null;
    public ?string $status = null;
    public ?string $timestamp = null;
    public ?array $update = null;
}

/** Request payload for Test#remove. */
class TestRemoveMatch
{
    public ?array $data = null;
    public string $id;
    public ?string $message = null;
    public ?array $received = null;
    public ?string $status = null;
    public ?string $timestamp = null;
    public ?array $update = null;
}

/** Testing entity data model. */
class Testing
{
    public ?array $data = null;
    public ?string $filename = null;
    public ?string $message = null;
    public ?int $size = null;
    public ?string $status = null;
    public ?string $timestamp = null;
}

/** Request payload for Testing#load. */
class TestingLoadMatch
{
    public ?array $data = null;
    public ?string $filename = null;
    public ?string $message = null;
    public ?int $size = null;
    public ?string $status = null;
    public ?string $timestamp = null;
}

/** Request payload for Testing#create. */
class TestingCreateData
{
    public ?array $data = null;
    public ?string $filename = null;
    public ?string $message = null;
    public ?int $size = null;
    public ?string $status = null;
    public ?string $timestamp = null;
}

