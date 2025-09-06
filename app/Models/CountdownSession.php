<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\CountdownSession
 *
 * @property int $id
 * @property string $participant_name
 * @property int $duration_minutes
 * @property string $status
 * @property int $overtime_seconds
 * @property \Illuminate\Support\Carbon|null $started_at
 * @property \Illuminate\Support\Carbon|null $ended_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession query()
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession whereDurationMinutes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession whereEndedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession whereOvertimeSeconds($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession whereParticipantName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession active()
 * @method static \Illuminate\Database\Eloquent\Builder|CountdownSession completed()
 * @method static \Database\Factories\CountdownSessionFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class CountdownSession extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'participant_name',
        'duration_minutes',
        'status',
        'overtime_seconds',
        'started_at',
        'ended_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'duration_minutes' => 'integer',
        'overtime_seconds' => 'integer',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope a query to only include active sessions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include completed sessions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeCompleted($query)
    {
        return $query->whereIn('status', ['completed', 'overtime']);
    }
}