package = "voxgig-sdk-discard"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/discard-sdk.git"
}
description = {
  summary = "Discard SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
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
