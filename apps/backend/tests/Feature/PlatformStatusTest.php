<?php

namespace Tests\Feature;

use Tests\TestCase;

final class PlatformStatusTest extends TestCase
{
    public function test_the_versioned_platform_status_endpoint_is_available(): void
    {
        config([
            'store.key' => 'demo',
            'store.name' => 'Demo Optics',
            'store.domain' => 'demo.example.test',
        ]);

        $response = $this->getJson('/api/v1/status');

        $response
            ->assertOk()
            ->assertJsonPath('data.status', 'ok')
            ->assertJsonPath('data.store.key', 'demo')
            ->assertJsonPath('data.store.domain', 'demo.example.test');
    }
}
