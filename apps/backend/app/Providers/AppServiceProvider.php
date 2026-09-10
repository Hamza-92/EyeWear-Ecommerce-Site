<?php

namespace App\Providers;

use App\Domain\Stores\Contracts\ResolvesStore;
use App\Infrastructure\Stores\ConfigStoreResolver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ResolvesStore::class, ConfigStoreResolver::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
