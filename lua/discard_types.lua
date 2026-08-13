-- Typed models for the Discard SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AiChat
---@field context? table
---@field message string
---@field response? string
---@field status? string
---@field timestamp? string

---@class AiChatCreateData
---@field context? table
---@field message string
---@field response? string
---@field status? string
---@field timestamp? string

---@class Test
---@field data? table
---@field id? string
---@field message? string
---@field status? string
---@field timestamp? string
---@field updates? table

---@class TestLoadMatch
---@field data? table
---@field id string
---@field message? string
---@field status? string
---@field timestamp? string
---@field updates? table

---@class TestCreateData
---@field data? table
---@field id? string
---@field message? string
---@field status? string
---@field timestamp? string
---@field updates? table

---@class TestUpdateData
---@field data? table
---@field id? string
---@field message? string
---@field status? string
---@field timestamp? string
---@field updates? table

---@class TestRemoveMatch
---@field data? table
---@field id string
---@field message? string
---@field status? string
---@field timestamp? string
---@field updates? table

---@class Testing
---@field active_endpoints? number
---@field filename? string
---@field inactive_endpoints? number
---@field message? string
---@field period? string
---@field size? number
---@field status? string
---@field timestamp? string
---@field total_requests? number

---@class TestingLoadMatch
---@field active_endpoints? number
---@field filename? string
---@field inactive_endpoints? number
---@field message? string
---@field period? string
---@field size? number
---@field status? string
---@field timestamp? string
---@field total_requests? number

---@class TestingCreateData
---@field active_endpoints? number
---@field filename? string
---@field inactive_endpoints? number
---@field message? string
---@field period? string
---@field size? number
---@field status? string
---@field timestamp? string
---@field total_requests? number

local M = {}

return M
