<?php

use App\Http\Controllers\Api\V1\PlatformStatusController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/status', PlatformStatusController::class)->name('api.v1.status');
});
