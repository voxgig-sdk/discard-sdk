# Discard SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module DiscardFeatures
  def self.make_feature(name)
    case name
    when "base"
      DiscardBaseFeature.new
    when "ratelimit"
      DiscardRatelimitFeature.new
    when "retry"
      DiscardRetryFeature.new
    when "test"
      DiscardTestFeature.new
    when "timeout"
      DiscardTimeoutFeature.new
    else
      DiscardBaseFeature.new
    end
  end
end
