# Discard SDK utility: feature_add
module DiscardUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
