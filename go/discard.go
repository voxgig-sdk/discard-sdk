package voxgigdiscardsdk

import (
	"github.com/voxgig-sdk/discard-sdk/go/core"
	"github.com/voxgig-sdk/discard-sdk/go/entity"
	"github.com/voxgig-sdk/discard-sdk/go/feature"
	_ "github.com/voxgig-sdk/discard-sdk/go/utility"
)

// Type aliases preserve external API.
type DiscardSDK = core.DiscardSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type DiscardEntity = core.DiscardEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type DiscardError = core.DiscardError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAiChatEntityFunc = func(client *core.DiscardSDK, entopts map[string]any) core.DiscardEntity {
		return entity.NewAiChatEntity(client, entopts)
	}
	core.NewTestEntityFunc = func(client *core.DiscardSDK, entopts map[string]any) core.DiscardEntity {
		return entity.NewTestEntity(client, entopts)
	}
	core.NewTestingEntityFunc = func(client *core.DiscardSDK, entopts map[string]any) core.DiscardEntity {
		return entity.NewTestingEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewDiscardSDK = core.NewDiscardSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
