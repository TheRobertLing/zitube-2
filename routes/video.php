<?php

use App\Http\Controllers\DictionaryController;
use Illuminate\Support\Facades\Route;
// All the routes related to the video page

// Route for fetching definitions

Route::get('/api/v1/dictionary', [DictionaryController::class,'get'])->name('dictionary');
