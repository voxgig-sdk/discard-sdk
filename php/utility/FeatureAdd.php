<?php
declare(strict_types=1);

// Discard SDK utility: feature_add

class DiscardFeatureAdd
{
    public static function call(DiscardContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
