<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

final class AdminShellController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'sections' => [
                ['label' => 'Catalog', 'description' => 'Products, variants, brands, and inventory'],
                ['label' => 'Lens Studio', 'description' => 'Lens rules, treatments, and pricing'],
                ['label' => 'Virtual Try-On', 'description' => 'Models, associations, and calibration'],
                ['label' => 'Commerce', 'description' => 'Orders, payments, and promotions'],
                ['label' => 'Content', 'description' => 'Editorial, navigation, and campaigns'],
                ['label' => 'Settings', 'description' => 'Store identity, domains, and integrations'],
            ],
        ]);
    }
}
