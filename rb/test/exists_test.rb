# Discard SDK exists test

require "minitest/autorun"
require_relative "../Discard_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = DiscardSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
