<?php

use Inertia\Inertia;

Route::get('/dev/video', function () {
    return Inertia::render('dev/DevVideo');
});

Route::get('/dev/main', function () {
    return Inertia::render('dev/DevMain');
});
