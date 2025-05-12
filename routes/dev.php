<?php

use Inertia\Inertia;

Route::get('/dev/video', function () {
    return Inertia::render('dev/DevVideo');
});
