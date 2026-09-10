<?php

return [
    'key' => env('STORE_KEY', 'default'),
    'name' => env('STORE_NAME', 'Eyewear'),
    'domain' => env('STORE_DOMAIN', 'localhost'),

    'branding' => [
        'logo_url' => env('STORE_LOGO_URL'),
        'display_font' => 'Instrument Serif',
        'interface_font' => 'Manrope',
    ],
];
