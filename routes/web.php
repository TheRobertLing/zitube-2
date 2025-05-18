<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__ . '/public.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/dashboard.php';
require __DIR__ . '/api.php';
require __DIR__ . '/dev.php';

Route::fallback(function () {
    return Inertia::render('PageNotFound');
});
