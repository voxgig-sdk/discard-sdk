package = "voxgig-sdk-discard"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/discard-sdk.git",
  tag = "lua/v0.0.1",
  dir = "discard-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the DISCARD public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/discard-sdk",
  issues_url = "https://github.com/voxgig-sdk/discard-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "discard" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["discard_sdk"] = "discard_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
