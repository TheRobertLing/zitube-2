<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\User\UserHistoryController;
use App\Http\Controllers\User\UserSavedWordsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * All the settings related routes for regular users
 */
Route::middleware('auth')->prefix('account')->name('account.')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/Appearance');
    })->name('appearance');
});

/**
 * All the general routes a regular logged in user can access
 */
Route::middleware(['auth', 'verified'])->prefix('account')->name('account.')->group(function () {
    Route::get('dashboard', [UserDashboardController::class, 'index'])->name('dashboard');
    Route::get('history', [UserHistoryController::class, 'index'])->name('history');
    Route::get('saved-words', [UserSavedWordsController::class, 'index'])->name('saved-words');
});

