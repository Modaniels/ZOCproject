<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Http;

class MpesaServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Configure HTTP client to ignore SSL verification in development
        if (config('app.env') === 'local') {
            Http::globalOptions([
                'verify' => false,
            ]);
        }
    }
}
