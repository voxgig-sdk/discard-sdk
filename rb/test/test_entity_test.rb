# Test entity test

require "minitest/autorun"
require "json"
require_relative "../Discard_sdk"
require_relative "runner"

class TestEntityTest < Minitest::Test
  def test_create_instance
    testsdk = DiscardSDK.test(nil, nil)
    ent = testsdk.Test(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = test_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "test." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set DISCARD_TEST_TEST_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    test_ref01_ent = client.Test(nil)
    test_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.test"), "test_ref01"))

    test_ref01_data_result, err = test_ref01_ent.create(test_ref01_data, nil)
    assert_nil err
    test_ref01_data = Helpers.to_map(test_ref01_data_result)
    assert !test_ref01_data.nil?
    assert !test_ref01_data["id"].nil?

    # UPDATE
    test_ref01_data_up0_up = {
      "id" => test_ref01_data["id"],
    }

    test_ref01_markdef_up0_name = "message"
    test_ref01_markdef_up0_value = "Mark01-test_ref01_#{setup[:now]}"
    test_ref01_data_up0_up[test_ref01_markdef_up0_name] = test_ref01_markdef_up0_value

    test_ref01_resdata_up0_result, err = test_ref01_ent.update(test_ref01_data_up0_up, nil)
    assert_nil err
    test_ref01_resdata_up0 = Helpers.to_map(test_ref01_resdata_up0_result)
    assert !test_ref01_resdata_up0.nil?
    assert_equal test_ref01_resdata_up0["id"], test_ref01_data_up0_up["id"]
    assert_equal test_ref01_resdata_up0[test_ref01_markdef_up0_name], test_ref01_markdef_up0_value

    # LOAD
    test_ref01_match_dt0 = {
      "id" => test_ref01_data["id"],
    }
    test_ref01_data_dt0_loaded, err = test_ref01_ent.load(test_ref01_match_dt0, nil)
    assert_nil err
    test_ref01_data_dt0_load_result = Helpers.to_map(test_ref01_data_dt0_loaded)
    assert !test_ref01_data_dt0_load_result.nil?
    assert_equal test_ref01_data_dt0_load_result["id"], test_ref01_data["id"]

    # REMOVE
    test_ref01_match_rm0 = {
      "id" => test_ref01_data["id"],
    }
    _, err = test_ref01_ent.remove(test_ref01_match_rm0, nil)
    assert_nil err

  end
end

def test_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "test", "TestTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = DiscardSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["test01", "test02", "test03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["DISCARD_TEST_TEST_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "DISCARD_TEST_TEST_ENTID" => idmap,
    "DISCARD_TEST_LIVE" => "FALSE",
    "DISCARD_TEST_EXPLAIN" => "FALSE",
    "DISCARD_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["DISCARD_TEST_TEST_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["DISCARD_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["DISCARD_APIKEY"],
      },
      extra || {},
    ])
    client = DiscardSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["DISCARD_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["DISCARD_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
