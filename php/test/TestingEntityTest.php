<?php
declare(strict_types=1);

// Testing entity test

require_once __DIR__ . '/../discard_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class TestingEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = DiscardSDK::test(null, null);
        $ent = $testsdk->Testing(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = testing_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "testing." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set DISCARD_TEST_TESTING_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $testing_ref01_ent = $client->Testing(null);
        $testing_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.testing"), "testing_ref01"));

        [$testing_ref01_data_result, $err] = $testing_ref01_ent->create($testing_ref01_data, null);
        $this->assertNull($err);
        $testing_ref01_data = Helpers::to_map($testing_ref01_data_result);
        $this->assertNotNull($testing_ref01_data);

        // LOAD
        $testing_ref01_match_dt0 = [];
        [$testing_ref01_data_dt0_loaded, $err] = $testing_ref01_ent->load($testing_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($testing_ref01_data_dt0_loaded);

    }
}

function testing_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/testing/TestingTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = DiscardSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["testing01", "testing02", "testing03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("DISCARD_TEST_TESTING_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "DISCARD_TEST_TESTING_ENTID" => $idmap,
        "DISCARD_TEST_LIVE" => "FALSE",
        "DISCARD_TEST_EXPLAIN" => "FALSE",
        "DISCARD_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["DISCARD_TEST_TESTING_ENTID"]);
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
