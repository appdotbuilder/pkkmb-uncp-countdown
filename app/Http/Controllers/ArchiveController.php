<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\CountdownSession;
use App\Models\AppSetting;
use Inertia\Inertia;

class ArchiveController extends Controller
{
    /**
     * Display the archive page.
     */
    public function index()
    {
        $sessions = CountdownSession::completed()
            ->latest()
            ->paginate(10);

        $appSettings = AppSetting::first();

        return Inertia::render('countdown/archive', [
            'sessions' => $sessions,
            'appSettings' => $appSettings,
        ]);
    }
}