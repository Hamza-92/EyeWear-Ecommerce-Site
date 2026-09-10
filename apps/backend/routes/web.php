<?php

use App\Http\Controllers\Admin\AdminShellController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/'.config('platform.admin.path'));

Route::prefix(config('platform.admin.path'))
    ->name('admin.')
    ->group(function (): void {
        Route::get('/', AdminShellController::class)->name('dashboard');
    });
