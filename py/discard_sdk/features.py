# Discard SDK feature factory

from discard_sdk.feature.base_feature import DiscardBaseFeature
from discard_sdk.feature.test_feature import DiscardTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DiscardBaseFeature(),
        "test": lambda: DiscardTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
