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
---@field received? table
---@field status? string
---@field timestamp? string
---@field update? table

---@class TestLoadMatch
---@field data? table
---@field id string
---@field message? string
---@field received? table
---@field status? string
---@field timestamp? string
---@field update? table

---@class TestCreateData
---@field data? table
---@field id? string
---@field message? string
---@field received? table
---@field status? string
---@field timestamp? string
---@field update? table

---@class TestUpdateData
---@field data? table
---@field id? string
---@field message? string
---@field received? table
---@field status? string
---@field timestamp? string
---@field update? table

---@class TestRemoveMatch
---@field data? table
---@field id string
---@field message? string
---@field received? table
---@field status? string
---@field timestamp? string
---@field update? table

---@class Testing
---@field data? table
---@field filename? string
---@field message? string
---@field size? number
---@field status? string
---@field timestamp? string

---@class TestingLoadMatch
---@field data? table
---@field filename? string
---@field message? string
---@field size? number
---@field status? string
---@field timestamp? string

---@class TestingCreateData
---@field data? table
---@field filename? string
---@field message? string
---@field size? number
---@field status? string
---@field timestamp? string

local M = {}

return M
