package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAiChatEntityFunc func(client *DiscardSDK, entopts map[string]any) DiscardEntity

var NewTestEntityFunc func(client *DiscardSDK, entopts map[string]any) DiscardEntity

var NewTestingEntityFunc func(client *DiscardSDK, entopts map[string]any) DiscardEntity

