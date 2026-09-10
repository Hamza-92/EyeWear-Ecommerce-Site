<?php

namespace App\Http\Middleware;

use App\Domain\Stores\Contracts\ResolvesStore;
use Illuminate\Http\Request;
use Inertia\Middleware;

final class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    /**
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'appName' => config('app.name'),
            'store' => fn (): array => app(ResolvesStore::class)->current($request)->toArray(),
        ];
    }
}
