# Discard SDK feature factory

from feature.base_feature import DiscardBaseFeature
from feature.test_feature import DiscardTestFeature


def _make_feature(name):
    features = {
        "base": lambda: DiscardBaseFeature(),
        "test": lambda: DiscardTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
