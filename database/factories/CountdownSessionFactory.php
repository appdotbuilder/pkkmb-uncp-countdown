<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CountdownSession>
 */
class CountdownSessionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'participant_name' => fake()->name(),
            'duration_minutes' => fake()->numberBetween(1, 60),
            'status' => fake()->randomElement(['completed', 'overtime']),
            'overtime_seconds' => fake()->numberBetween(0, 300),
            'started_at' => fake()->dateTimeBetween('-1 week', 'now'),
            'ended_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ];
    }

    /**
     * Indicate that the session is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'started_at' => now(),
            'ended_at' => null,
        ]);
    }

    /**
     * Indicate that the session was completed on time.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'overtime_seconds' => 0,
        ]);
    }

    /**
     * Indicate that the session went overtime.
     */
    public function overtime(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'overtime',
            'overtime_seconds' => fake()->numberBetween(1, 600),
        ]);
    }
}