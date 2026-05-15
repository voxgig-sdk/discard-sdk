package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/discard-sdk"
	"github.com/voxgig-sdk/discard-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestAiChatEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AiChat(nil)
		if ent == nil {
			t.Fatal("expected non-nil AiChatEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := ai_chatBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "ai_chat." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set DISCARD_TEST_AI_CHAT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		aiChatRef01Ent := client.AiChat(nil)
		aiChatRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "ai_chat"}, setup.data), "ai_chat_ref01"))

		aiChatRef01DataResult, err := aiChatRef01Ent.Create(aiChatRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		aiChatRef01Data = core.ToMapAny(aiChatRef01DataResult)
		if aiChatRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func ai_chatBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "ai_chat", "AiChatTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read ai_chat test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse ai_chat test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"ai_chat01", "ai_chat02", "ai_chat03"},
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
	entidEnvRaw := os.Getenv("DISCARD_TEST_AI_CHAT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DISCARD_TEST_AI_CHAT_ENTID": idmap,
		"DISCARD_TEST_LIVE":      "FALSE",
		"DISCARD_TEST_EXPLAIN":   "FALSE",
		"DISCARD_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["DISCARD_TEST_AI_CHAT_ENTID"])
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
