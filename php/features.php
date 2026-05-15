<?php
declare(strict_types=1);

// Discard SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class DiscardFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new DiscardBaseFeature();
            case "test":
                return new DiscardTestFeature();
            default:
                return new DiscardBaseFeature();
        }
    }
}
