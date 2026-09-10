<?php

namespace App\Domain\Stores\Data;

final readonly class ResolvedStore
{
    public function __construct(
        public string $key,
        public string $name,
        public string $domain,
    ) {}

    /**
     * @return array{key: string, name: string, domain: string}
     */
    public function toArray(): array
    {
        return [
            'key' => $this->key,
            'name' => $this->name,
            'domain' => $this->domain,
        ];
    }
}
