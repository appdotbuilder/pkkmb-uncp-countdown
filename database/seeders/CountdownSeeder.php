<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\AppSetting;
use App\Models\CountdownSession;

class CountdownSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Create default app settings
        AppSetting::firstOrCreate([], [
            'app_title' => 'PKKMB UNCP 2025',
            'university_name' => 'Universitas Nusa Cendana Kupang',
            'logo' => null,
        ]);

        // Create sample countdown sessions for demo
        CountdownSession::factory()->count(15)->create();
        
        // Create some specific examples
        CountdownSession::factory()->completed()->create([
            'participant_name' => 'Maria Santos',
            'duration_minutes' => 5,
            'started_at' => now()->subHours(2),
            'ended_at' => now()->subHours(2)->addMinutes(5),
        ]);

        CountdownSession::factory()->overtime()->create([
            'participant_name' => 'John Doe',
            'duration_minutes' => 10,
            'overtime_seconds' => 120,
            'started_at' => now()->subHours(1),
            'ended_at' => now()->subHours(1)->addMinutes(12),
        ]);

        CountdownSession::factory()->overtime()->create([
            'participant_name' => 'Sari Wulandari',
            'duration_minutes' => 15,
            'overtime_seconds' => 300,
            'started_at' => now()->subMinutes(30),
            'ended_at' => now()->subMinutes(25),
        ]);
    }
}