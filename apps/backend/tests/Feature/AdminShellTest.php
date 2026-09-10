<?php

namespace Tests\Feature;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

final class AdminShellTest extends TestCase
{
    public function test_the_admin_foundation_renders_through_inertia(): void
    {
        $this->withoutVite();

        $response = $this->get('/admin');

        $response->assertOk()->assertInertia(
            fn (Assert $page): Assert => $page
                ->component('Admin/Dashboard')
                ->where('store.key', 'default')
                ->has('sections', 6),
        );
    }
}
