<?php

namespace App\Infrastructure\Stores;

use App\Domain\Stores\Contracts\ResolvesStore;
use App\Domain\Stores\Data\ResolvedStore;
use Illuminate\Http\Request;

final class ConfigStoreResolver implements ResolvesStore
{
    public function current(Request $request): ResolvedStore
    {
        $configuredDomain = (string) config('store.domain');

        return new ResolvedStore(
            key: (string) config('store.key', 'default'),
            name: (string) config('store.name', 'Eyewear'),
            domain: $configuredDomain !== '' ? $configuredDomain : $request->getHost(),
        );
    }
}
