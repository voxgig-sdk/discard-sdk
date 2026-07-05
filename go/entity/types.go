// Typed models for the Discard SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

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
	Received *map[string]any `json:"received,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Update *map[string]any `json:"update,omitempty"`
}

// TestLoadMatch is the typed request payload for Test.LoadTyped.
type TestLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Id string `json:"id"`
	Message *string `json:"message,omitempty"`
	Received *map[string]any `json:"received,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Update *map[string]any `json:"update,omitempty"`
}

// TestCreateData is the typed request payload for Test.CreateTyped.
type TestCreateData struct {
	Data *map[string]any `json:"data,omitempty"`
	Id *string `json:"id,omitempty"`
	Message *string `json:"message,omitempty"`
	Received *map[string]any `json:"received,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Update *map[string]any `json:"update,omitempty"`
}

// TestUpdateData is the typed request payload for Test.UpdateTyped.
type TestUpdateData struct {
	Data *map[string]any `json:"data,omitempty"`
	Id *string `json:"id,omitempty"`
	Message *string `json:"message,omitempty"`
	Received *map[string]any `json:"received,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Update *map[string]any `json:"update,omitempty"`
}

// TestRemoveMatch is the typed request payload for Test.RemoveTyped.
type TestRemoveMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Id string `json:"id"`
	Message *string `json:"message,omitempty"`
	Received *map[string]any `json:"received,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
	Update *map[string]any `json:"update,omitempty"`
}

// Testing is the typed data model for the testing entity.
type Testing struct {
	Data *map[string]any `json:"data,omitempty"`
	Filename *string `json:"filename,omitempty"`
	Message *string `json:"message,omitempty"`
	Size *int `json:"size,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
}

// TestingLoadMatch is the typed request payload for Testing.LoadTyped.
type TestingLoadMatch struct {
	Data *map[string]any `json:"data,omitempty"`
	Filename *string `json:"filename,omitempty"`
	Message *string `json:"message,omitempty"`
	Size *int `json:"size,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
}

// TestingCreateData is the typed request payload for Testing.CreateTyped.
type TestingCreateData struct {
	Data *map[string]any `json:"data,omitempty"`
	Filename *string `json:"filename,omitempty"`
	Message *string `json:"message,omitempty"`
	Size *int `json:"size,omitempty"`
	Status *string `json:"status,omitempty"`
	Timestamp *string `json:"timestamp,omitempty"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
