// Typed models for the Discard SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/discard-sdk/go/core"
)

// AiChat is the typed data model for the ai_chat entity.
type AiChat struct {
	Context *[]any `json:"context,omitempty"`
	Message string `json:"message"`
	Response *string `json:"response,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
}

// AiChatCreateData is the typed request payload for AiChat.CreateTyped.
type AiChatCreateData struct {
	Context *[]any `json:"context,omitempty"`
	Message string `json:"message"`
	Response *string `json:"response,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
}

// Test is the typed data model for the test entity.
type Test struct {
	Data *map[string]any `json:"data,omitempty"`
	Id *string `json:"id,omitempty"`
	Message *string `json:"message,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Updates *map[string]any `json:"updates,omitempty"`
}

// TestLoadMatch is the typed request payload for Test.LoadTyped.
type TestLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Id string `json:"id"`
	Message *string `json:"message,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Updates *map[string]any `json:"updates,omitempty"`
}

// TestCreateData is the typed request payload for Test.CreateTyped.
type TestCreateData struct {
	Data *map[string]any `json:"data,omitempty"`
	Id *string `json:"id,omitempty"`
	Message *string `json:"message,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Updates *map[string]any `json:"updates,omitempty"`
}

// TestUpdateData is the typed request payload for Test.UpdateTyped.
type TestUpdateData struct {
	Data *map[string]any `json:"data,omitempty"`
	Id *string `json:"id,omitempty"`
	Message *string `json:"message,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Updates *map[string]any `json:"updates,omitempty"`
}

// TestRemoveMatch is the typed request payload for Test.RemoveTyped.
type TestRemoveMatch struct {
	Id *string `json:"id,omitempty"`
}

// Testing is the typed data model for the testing entity.
type Testing struct {
	ActiveEndpoints *int `json:"active_endpoints,omitempty"`
	Filename *string `json:"filename,omitempty"`
	InactiveEndpoints *int `json:"inactive_endpoints,omitempty"`
	Message *string `json:"message,omitempty"`
	Period *string `json:"period,omitempty"`
	Size *int `json:"size,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	TotalRequests *int `json:"total_requests,omitempty"`
}

// TestingLoadMatch is the typed request payload for Testing.LoadTyped.
type TestingLoadMatch struct {
	Period *string `json:"period,omitempty"`
}

// TestingCreateData is the typed request payload for Testing.CreateTyped.
type TestingCreateData struct {
	ActiveEndpoints *int `json:"active_endpoints,omitempty"`
	Filename *string `json:"filename,omitempty"`
	InactiveEndpoints *int `json:"inactive_endpoints,omitempty"`
	Message *string `json:"message,omitempty"`
	Period *string `json:"period,omitempty"`
	Size *int `json:"size,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	TotalRequests *int `json:"total_requests,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
