# Discard SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module DiscardFeatures
  def self.make_feature(name)
    case name
    when "base"
      DiscardBaseFeature.new
    when "test"
      DiscardTestFeature.new
    else
      DiscardBaseFeature.new
    end
  end
end
