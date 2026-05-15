<?php
declare(strict_types=1);

// Discard SDK utility: prepare_body

class DiscardPrepareBody
{
    public static function call(DiscardContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
