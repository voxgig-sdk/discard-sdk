package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/discard-sdk/go"
	"github.com/voxgig-sdk/discard-sdk/go/core"

	vs "github.com/voxgig-sdk/discard-sdk/go/utility/struct"
)

func TestTestingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Testing(nil)
		if ent == nil {
			t.Fatal("expected non-nil TestingEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := testingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "testing." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set DISCARD_TEST_TESTING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		testingRef01Ent := client.Testing(nil)
		testingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "testing"}, setup.data), "testing_ref01"))

		testingRef01DataResult, err := testingRef01Ent.Create(testingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		testingRef01Data = core.ToMapAny(testingRef01DataResult)
		if testingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		testingRef01MatchDt0 := map[string]any{}
		testingRef01DataDt0Loaded, err := testingRef01Ent.Load(testingRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if testingRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func testingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "testing", "TestingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read testing test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse testing test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"testing01", "testing02", "testing03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("DISCARD_TEST_TESTING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DISCARD_TEST_TESTING_ENTID": idmap,
		"DISCARD_TEST_LIVE":      "FALSE",
		"DISCARD_TEST_EXPLAIN":   "FALSE",
		"DISCARD_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["DISCARD_TEST_TESTING_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["DISCARD_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["DISCARD_APIKEY"],
			},
			extra,
		})
		client = sdk.NewDiscardSDK(core.ToMapAny(mergedOpts))
	}

	live := env["DISCARD_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["DISCARD_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
