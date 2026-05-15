# Discard SDK utility: make_context
require_relative '../core/context'
module DiscardUtilities
  MakeContext = ->(ctxmap, basectx) {
    DiscardContext.new(ctxmap, basectx)
  }
end
