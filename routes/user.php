<?php

use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\User\UserHistoryController;
use App\Http\Controllers\User\UserSavedWordsController;

// All the routes related to navigation in a users profile
Route::middleware(['auth', 'verified'])->prefix('account')->name('account.')->group(function () {
    Route::get('dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
    Route::get('history', [UserHistoryController::class, 'index'])->name('history');
    Route::get('saved-words', [UserSavedWordsController::class, 'index'])->name('saved-words');
});
