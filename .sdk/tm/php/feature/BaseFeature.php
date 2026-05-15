<?php
declare(strict_types=1);

// Discard SDK base feature

class DiscardBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(DiscardContext $ctx, array $options): void {}
    public function PostConstruct(DiscardContext $ctx): void {}
    public function PostConstructEntity(DiscardContext $ctx): void {}
    public function SetData(DiscardContext $ctx): void {}
    public function GetData(DiscardContext $ctx): void {}
    public function GetMatch(DiscardContext $ctx): void {}
    public function SetMatch(DiscardContext $ctx): void {}
    public function PrePoint(DiscardContext $ctx): void {}
    public function PreSpec(DiscardContext $ctx): void {}
    public function PreRequest(DiscardContext $ctx): void {}
    public function PreResponse(DiscardContext $ctx): void {}
    public function PreResult(DiscardContext $ctx): void {}
    public function PreDone(DiscardContext $ctx): void {}
    public function PreUnexpected(DiscardContext $ctx): void {}
}
