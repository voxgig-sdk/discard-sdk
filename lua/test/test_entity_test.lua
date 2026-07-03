-- Test entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("discard_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("TestEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Test(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = test_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "test." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set DISCARD_TEST_TEST_ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- CREATE
    local test_ref01_ent = client:Test(nil)
    local test_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.test"), "test_ref01"))

    local test_ref01_data_result, err = test_ref01_ent:create(test_ref01_data, nil)
    assert.is_nil(err)
    test_ref01_data = helpers.to_map(test_ref01_data_result)
    assert.is_not_nil(test_ref01_data)
    assert.is_not_nil(test_ref01_data["id"])

    -- UPDATE
    local test_ref01_data_up0_up = {
      id = test_ref01_data["id"],
    }

    local test_ref01_markdef_up0_name = "message"
    local test_ref01_markdef_up0_value = "Mark01-test_ref01_" .. tostring(setup.now)
    test_ref01_data_up0_up[test_ref01_markdef_up0_name] = test_ref01_markdef_up0_value

    local test_ref01_resdata_up0_result, err = test_ref01_ent:update(test_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local test_ref01_resdata_up0 = helpers.to_map(test_ref01_resdata_up0_result)
    assert.is_not_nil(test_ref01_resdata_up0)
    assert.are.equal(test_ref01_resdata_up0["id"], test_ref01_data_up0_up["id"])
    assert.are.equal(test_ref01_resdata_up0[test_ref01_markdef_up0_name], test_ref01_markdef_up0_value)

    -- LOAD
    local test_ref01_match_dt0 = {
      id = test_ref01_data["id"],
    }
    local test_ref01_data_dt0_loaded, err = test_ref01_ent:load(test_ref01_match_dt0, nil)
    assert.is_nil(err)
    local test_ref01_data_dt0_load_result = helpers.to_map(test_ref01_data_dt0_loaded)
    assert.is_not_nil(test_ref01_data_dt0_load_result)
    assert.are.equal(test_ref01_data_dt0_load_result["id"], test_ref01_data["id"])

    -- REMOVE
    local test_ref01_match_rm0 = {
      id = test_ref01_data["id"],
    }
    local _, err = test_ref01_ent:remove(test_ref01_match_rm0, nil)
    assert.is_nil(err)

  end)
end)

function test_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/test/TestTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read test test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "test01", "test02", "test03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("DISCARD_TEST_TEST_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["DISCARD_TEST_TEST_ENTID"] = idmap,
    ["DISCARD_TEST_LIVE"] = "FALSE",
    ["DISCARD_TEST_EXPLAIN"] = "FALSE",
    ["DISCARD_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["DISCARD_TEST_TEST_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["DISCARD_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["DISCARD_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["DISCARD_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["DISCARD_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
