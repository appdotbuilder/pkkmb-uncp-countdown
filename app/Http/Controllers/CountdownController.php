<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCountdownSessionRequest;
use App\Models\CountdownSession;
use App\Models\AppSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CountdownController extends Controller
{
    /**
     * Display the countdown timer page.
     */
    public function index()
    {
        $activeSession = CountdownSession::active()->first();
        $appSettings = AppSetting::first();
        
        return Inertia::render('countdown/index', [
            'activeSession' => $activeSession,
            'appSettings' => $appSettings,
        ]);
    }

    /**
     * Show the setup form for creating a new countdown session.
     */
    public function create()
    {
        $appSettings = AppSetting::first();
        
        return Inertia::render('countdown/setup', [
            'appSettings' => $appSettings,
        ]);
    }

    /**
     * Store a new countdown session.
     */
    public function store(StoreCountdownSessionRequest $request)
    {
        // End any active sessions first
        CountdownSession::active()->update([
            'status' => 'completed',
            'ended_at' => now(),
        ]);

        $session = CountdownSession::create([
            'participant_name' => $request->participant_name,
            'duration_minutes' => $request->duration_minutes,
            'status' => 'active',
            'started_at' => now(),
        ]);

        return redirect()->route('countdown.index')->with('success', 'Countdown berhasil dimulai!');
    }

    /**
     * Update session status (complete or overtime).
     */
    public function update(Request $request, CountdownSession $session)
    {
        $validated = $request->validate([
            'status' => 'required|in:completed,overtime',
            'overtime_seconds' => 'nullable|integer|min:0',
        ]);

        $session->update([
            'status' => $validated['status'],
            'overtime_seconds' => $validated['overtime_seconds'] ?? 0,
            'ended_at' => now(),
        ]);

        return redirect()->route('countdown.index')->with('success', 'Sesi countdown telah dihentikan.');
    }


}