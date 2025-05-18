<?php

use App\Http\Controllers\Admin\AdminEditVideoController;
use App\Http\Controllers\Admin\AdminNewVideoController;
use App\Http\Controllers\Admin\AdminUserController;

/**
 * All the routes only admins should be able to access
 */
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('new', [AdminNewVideoController::class, 'index'])->name('new');

    Route::get('edit', [AdminEditVideoController::class, 'index'])->name('edit');

    Route::get('users', [AdminUserController::class, 'index'])->name('users');
});
