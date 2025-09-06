<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\CountdownSession;
use App\Models\AppSetting;

class CountdownTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_countdown_page(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_can_create_countdown_session(): void
    {
        $response = $this->post('/countdown', [
            'participant_name' => 'John Doe',
            'duration_minutes' => 5,
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('countdown_sessions', [
            'participant_name' => 'John Doe',
            'duration_minutes' => 5,
            'status' => 'active',
        ]);
    }

    public function test_validates_countdown_session_data(): void
    {
        $response = $this->post('/countdown', [
            'participant_name' => '',
            'duration_minutes' => 0,
        ]);

        $response->assertSessionHasErrors(['participant_name', 'duration_minutes']);
    }

    public function test_can_update_session_to_completed(): void
    {
        $session = CountdownSession::factory()->active()->create();

        $response = $this->patch("/countdown/{$session->id}", [
            'status' => 'completed',
            'overtime_seconds' => 0,
        ]);

        $response->assertStatus(200);
        $session->refresh();
        $this->assertEquals('completed', $session->status);
    }

    public function test_can_update_session_to_overtime(): void
    {
        $session = CountdownSession::factory()->active()->create();

        $response = $this->patch("/countdown/{$session->id}", [
            'status' => 'overtime',
            'overtime_seconds' => 120,
        ]);

        $response->assertStatus(200);
        $session->refresh();
        $this->assertEquals('overtime', $session->status);
        $this->assertEquals(120, $session->overtime_seconds);
    }

    public function test_can_view_archive_page(): void
    {
        CountdownSession::factory()->count(5)->completed()->create();

        $response = $this->get('/archive');

        $response->assertStatus(200);
    }

    public function test_only_one_active_session_allowed(): void
    {
        // Create first active session
        $this->post('/countdown', [
            'participant_name' => 'First User',
            'duration_minutes' => 5,
        ]);

        // Create second session should complete the first
        $this->post('/countdown', [
            'participant_name' => 'Second User',
            'duration_minutes' => 10,
        ]);

        $this->assertEquals(1, CountdownSession::active()->count());
        $this->assertEquals(1, CountdownSession::where('status', 'completed')->count());
    }

    public function test_can_view_app_settings(): void
    {
        $response = $this->get('/app-settings');

        $response->assertStatus(200);
    }

    public function test_can_update_app_settings(): void
    {
        $response = $this->patch('/app-settings', [
            'app_title' => 'Custom Title',
            'university_name' => 'Custom University',
            'logo' => 'https://example.com/logo.png',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('app_settings', [
            'app_title' => 'Custom Title',
            'university_name' => 'Custom University',
            'logo' => 'https://example.com/logo.png',
        ]);
    }

    public function test_validates_app_settings_data(): void
    {
        $response = $this->patch('/app-settings', [
            'app_title' => '',
            'university_name' => '',
        ]);

        $response->assertSessionHasErrors(['app_title', 'university_name']);
    }
}