<?php

use App\Http\Controllers\DictionaryController;
use Illuminate\Support\Facades\Route;

/**
 * Dictionary api route
 */
Route::get('/api/v1/dictionary', [DictionaryController::class, 'get'])->name('dictionary');
