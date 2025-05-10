<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();

            // YouTube snippet info
            $table->string('youtube_id')->unique();
            $table->string('published_at');                        // ISO 8601 string, e.g. "2016-11-03T10:09:59Z"
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('thumbnail_small')->nullable();
            $table->string('thumbnail_large')->nullable();
            $table->string('channel_name');
            $table->json('tags')->nullable();                      // Stores ["tag1", "tag2", ...]

            // YouTube contentDetails
            $table->string('duration')->nullable();                // e.g. "PT13M"

            // YouTube statistics
            $table->unsignedBigInteger('view_count')->nullable();
            $table->unsignedBigInteger('like_count')->nullable();

            // Category of the video
            $table->json('categories')->nullable();

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
