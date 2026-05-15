# Discard SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

DiscardUtility.registrar = ->(u) {
  u.clean = DiscardUtilities::Clean
  u.done = DiscardUtilities::Done
  u.make_error = DiscardUtilities::MakeError
  u.feature_add = DiscardUtilities::FeatureAdd
  u.feature_hook = DiscardUtilities::FeatureHook
  u.feature_init = DiscardUtilities::FeatureInit
  u.fetcher = DiscardUtilities::Fetcher
  u.make_fetch_def = DiscardUtilities::MakeFetchDef
  u.make_context = DiscardUtilities::MakeContext
  u.make_options = DiscardUtilities::MakeOptions
  u.make_request = DiscardUtilities::MakeRequest
  u.make_response = DiscardUtilities::MakeResponse
  u.make_result = DiscardUtilities::MakeResult
  u.make_point = DiscardUtilities::MakePoint
  u.make_spec = DiscardUtilities::MakeSpec
  u.make_url = DiscardUtilities::MakeUrl
  u.param = DiscardUtilities::Param
  u.prepare_auth = DiscardUtilities::PrepareAuth
  u.prepare_body = DiscardUtilities::PrepareBody
  u.prepare_headers = DiscardUtilities::PrepareHeaders
  u.prepare_method = DiscardUtilities::PrepareMethod
  u.prepare_params = DiscardUtilities::PrepareParams
  u.prepare_path = DiscardUtilities::PreparePath
  u.prepare_query = DiscardUtilities::PrepareQuery
  u.result_basic = DiscardUtilities::ResultBasic
  u.result_body = DiscardUtilities::ResultBody
  u.result_headers = DiscardUtilities::ResultHeaders
  u.transform_request = DiscardUtilities::TransformRequest
  u.transform_response = DiscardUtilities::TransformResponse
}
