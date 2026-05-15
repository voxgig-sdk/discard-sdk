<?php
declare(strict_types=1);

// Discard SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DiscardMakeContext
{
    public static function call(array $ctxmap, ?DiscardContext $basectx): DiscardContext
    {
        return new DiscardContext($ctxmap, $basectx);
    }
}
