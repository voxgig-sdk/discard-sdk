# Discard SDK feature factory

from discard_sdk.feature.base_feature import DiscardBaseFeature
from discard_sdk.feature.ratelimit_feature import DiscardRatelimitFeature
from discard_sdk.feature.retry_feature import DiscardRetryFeature
from discard_sdk.feature.test_feature import DiscardTestFeature
from discard_sdk.feature.timeout_feature import DiscardTimeoutFeature


_FEATURES = {
    "base": lambda: DiscardBaseFeature(),
    "ratelimit": lambda: DiscardRatelimitFeature(),
    "retry": lambda: DiscardRetryFeature(),
    "test": lambda: DiscardTestFeature(),
    "timeout": lambda: DiscardTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
