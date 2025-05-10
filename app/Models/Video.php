<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $table = 'videos';

    protected $fillable = [
        'youtube_id',
        'published_at',
        'title',
        'description',
        'thumbnail_small',
        'thumbnail_large',
        'channel_name',
        'tags',
        'duration',
        'view_count',
        'like_count',
        'categories',
    ];

    protected $casts = [
        'tags' => 'array',
        'categories' => 'array',
        'published_at' => 'datetime',
        'view_count' => 'integer',
        'like_count' => 'integer',
    ];

}
