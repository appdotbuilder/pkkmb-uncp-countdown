<?php

use App\Http\Controllers\AppSettingController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\CountdownController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');



// Welcome page - showcase the app
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Countdown routes
Route::controller(CountdownController::class)->group(function () {
    Route::get('/countdown', 'index')->name('countdown.index');
    Route::post('/countdown', 'store')->name('countdown.store');
    Route::patch('/countdown/{session}', 'update')->name('countdown.update');
});

// Archive routes
Route::get('/archive', [ArchiveController::class, 'index'])->name('countdown.archive');

// App settings routes
Route::controller(AppSettingController::class)->group(function () {
    Route::get('/app-settings', 'index')->name('app-settings.index');
    Route::patch('/app-settings', 'update')->name('app-settings.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';