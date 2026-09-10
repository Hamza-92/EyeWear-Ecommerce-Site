<?php

namespace App\Http\Controllers\Api\V1;

use App\Domain\Stores\Contracts\ResolvesStore;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class PlatformStatusController extends Controller
{
    public function __invoke(Request $request, ResolvesStore $stores): JsonResponse
    {
        return response()->json([
            'data' => [
                'service' => 'premium-eyewear-platform-api',
                'status' => 'ok',
                'store' => $stores->current($request)->toArray(),
            ],
        ]);
    }
}
