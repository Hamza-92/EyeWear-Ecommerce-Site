<?php

return [
    'admin' => [
        'path' => env('ADMIN_PATH', 'admin'),
    ],

    'assets' => [
        'disk' => env('ASSET_STORAGE_DISK', 's3'),
    ],

    'search' => [
        'driver' => env('SEARCH_DRIVER'),
        'endpoint' => env('SEARCH_ENDPOINT'),
    ],

    'payments' => [
        'driver' => env('PAYMENT_DRIVER'),
    ],

    'transactional_email' => [
        'driver' => env('TRANSACTIONAL_EMAIL_DRIVER', 'log'),
    ],

    'analytics' => [
        'driver' => env('ANALYTICS_DRIVER'),
    ],
];
