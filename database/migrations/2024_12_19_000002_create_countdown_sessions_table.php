<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('countdown_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('participant_name')->comment('Name of the participant');
            $table->integer('duration_minutes')->comment('Duration in minutes (1-60)');
            $table->enum('status', ['active', 'completed', 'overtime'])->default('active')->comment('Session status');
            $table->integer('overtime_seconds')->default(0)->comment('Overtime duration in seconds');
            $table->timestamp('started_at')->nullable()->comment('When the session started');
            $table->timestamp('ended_at')->nullable()->comment('When the session ended');
            $table->timestamps();
            
            $table->index('status');
            $table->index('started_at');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('countdown_sessions');
    }
};