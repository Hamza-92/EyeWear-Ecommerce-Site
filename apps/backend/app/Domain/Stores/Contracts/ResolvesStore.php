<?php

namespace App\Domain\Stores\Contracts;

use App\Domain\Stores\Data\ResolvedStore;
use Illuminate\Http\Request;

interface ResolvesStore
{
    public function current(Request $request): ResolvedStore;
}
