# ProjectName SDK exists test

import pytest
from discard_sdk import DiscardSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DiscardSDK.test(None, None)
        assert testsdk is not None
