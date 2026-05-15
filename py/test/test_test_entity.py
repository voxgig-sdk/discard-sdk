# Test entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from discard_sdk import DiscardSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestTestEntity:

    def test_should_create_instance(self):
        testsdk = DiscardSDK.test(None, None)
        ent = testsdk.Test(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _test_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "test." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set DISCARD_TEST_TEST_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        test_ref01_ent = client.Test(None)
        test_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.test"), "test_ref01"))

        test_ref01_data_result, err = test_ref01_ent.create(test_ref01_data, None)
        assert err is None
        test_ref01_data = helpers.to_map(test_ref01_data_result)
        assert test_ref01_data is not None
        assert test_ref01_data["id"] is not None

        # UPDATE
        test_ref01_data_up0_up = {
            "id": test_ref01_data["id"],
        }

        test_ref01_markdef_up0_name = "message"
        test_ref01_markdef_up0_value = "Mark01-test_ref01_" + str(setup["now"])
        test_ref01_data_up0_up[test_ref01_markdef_up0_name] = test_ref01_markdef_up0_value

        test_ref01_resdata_up0_result, err = test_ref01_ent.update(test_ref01_data_up0_up, None)
        assert err is None
        test_ref01_resdata_up0 = helpers.to_map(test_ref01_resdata_up0_result)
        assert test_ref01_resdata_up0 is not None
        assert test_ref01_resdata_up0["id"] == test_ref01_data_up0_up["id"]
        assert test_ref01_resdata_up0[test_ref01_markdef_up0_name] == test_ref01_markdef_up0_value

        # LOAD
        test_ref01_match_dt0 = {
            "id": test_ref01_data["id"],
        }
        test_ref01_data_dt0_loaded, err = test_ref01_ent.load(test_ref01_match_dt0, None)
        assert err is None
        test_ref01_data_dt0_load_result = helpers.to_map(test_ref01_data_dt0_loaded)
        assert test_ref01_data_dt0_load_result is not None
        assert test_ref01_data_dt0_load_result["id"] == test_ref01_data["id"]

        # REMOVE
        test_ref01_match_rm0 = {
            "id": test_ref01_data["id"],
        }
        _, err = test_ref01_ent.remove(test_ref01_match_rm0, None)
        assert err is None



def _test_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/test/TestTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = DiscardSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["test01", "test02", "test03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "DISCARD_TEST_TEST_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "DISCARD_TEST_TEST_ENTID": idmap,
        "DISCARD_TEST_LIVE": "FALSE",
        "DISCARD_TEST_EXPLAIN": "FALSE",
        "DISCARD_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("DISCARD_TEST_TEST_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("DISCARD_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("DISCARD_APIKEY"),
            },
            extra or {},
        ])
        client = DiscardSDK(helpers.to_map(merged_opts))

    _live = env.get("DISCARD_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("DISCARD_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
