<?php
declare(strict_types=1);

// Test entity test

require_once __DIR__ . '/../discard_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class TestEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = DiscardSDK::test(null, null);
        $ent = $testsdk->Test_(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = test_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "test." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set DISCARD_TEST_TEST_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $test_ref01_ent = $client->Test_(null);
        $test_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.test"), "test_ref01"));

        [$test_ref01_data_result, $err] = $test_ref01_ent->create($test_ref01_data, null);
        $this->assertNull($err);
        $test_ref01_data = Helpers::to_map($test_ref01_data_result);
        $this->assertNotNull($test_ref01_data);
        $this->assertNotNull($test_ref01_data["id"]);

        // UPDATE
        $test_ref01_data_up0_up = [
            "id" => $test_ref01_data["id"],
        ];

        $test_ref01_markdef_up0_name = "message";
        $test_ref01_markdef_up0_value = "Mark01-test_ref01_" . $setup["now"];
        $test_ref01_data_up0_up[$test_ref01_markdef_up0_name] = $test_ref01_markdef_up0_value;

        [$test_ref01_resdata_up0_result, $err] = $test_ref01_ent->update($test_ref01_data_up0_up, null);
        $this->assertNull($err);
        $test_ref01_resdata_up0 = Helpers::to_map($test_ref01_resdata_up0_result);
        $this->assertNotNull($test_ref01_resdata_up0);
        $this->assertEquals($test_ref01_resdata_up0["id"], $test_ref01_data_up0_up["id"]);
        $this->assertEquals($test_ref01_resdata_up0[$test_ref01_markdef_up0_name], $test_ref01_markdef_up0_value);

        // LOAD
        $test_ref01_match_dt0 = [
            "id" => $test_ref01_data["id"],
        ];
        [$test_ref01_data_dt0_loaded, $err] = $test_ref01_ent->load($test_ref01_match_dt0, null);
        $this->assertNull($err);
        $test_ref01_data_dt0_load_result = Helpers::to_map($test_ref01_data_dt0_loaded);
        $this->assertNotNull($test_ref01_data_dt0_load_result);
        $this->assertEquals($test_ref01_data_dt0_load_result["id"], $test_ref01_data["id"]);

        // REMOVE
        $test_ref01_match_rm0 = [
            "id" => $test_ref01_data["id"],
        ];
        [$_, $err] = $test_ref01_ent->remove($test_ref01_match_rm0, null);
        $this->assertNull($err);

    }
}

function test_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/test/TestTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = DiscardSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["test01", "test02", "test03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("DISCARD_TEST_TEST_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "DISCARD_TEST_TEST_ENTID" => $idmap,
        "DISCARD_TEST_LIVE" => "FALSE",
        "DISCARD_TEST_EXPLAIN" => "FALSE",
        "DISCARD_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["DISCARD_TEST_TEST_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["DISCARD_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["DISCARD_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new DiscardSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["DISCARD_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["DISCARD_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
