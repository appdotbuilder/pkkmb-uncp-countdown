<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateAppSettingRequest;
use App\Models\AppSetting;
use Inertia\Inertia;

class AppSettingController extends Controller
{
    /**
     * Display the app settings page.
     */
    public function index()
    {
        $settings = AppSetting::firstOrCreate([], [
            'app_title' => 'PKKMB UNCP 2025',
            'university_name' => 'Universitas Nusa Cendana Kupang',
        ]);

        return Inertia::render('settings/app', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update the app settings.
     */
    public function update(UpdateAppSettingRequest $request)
    {
        $settings = AppSetting::firstOrCreate([], [
            'app_title' => 'PKKMB UNCP 2025',
            'university_name' => 'Universitas Nusa Cendana Kupang',
        ]);

        $settings->update($request->validated());

        return Inertia::render('settings/app', [
            'settings' => $settings,
        ]);
    }
}