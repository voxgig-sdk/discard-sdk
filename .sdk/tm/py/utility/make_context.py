# Discard SDK utility: make_context

from core.context import DiscardContext


def make_context_util(ctxmap, basectx):
    return DiscardContext(ctxmap, basectx)
