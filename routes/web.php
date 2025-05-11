<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('roadmap', function () {
    return Inertia::render('RoadMap');
})->name('roadmap');

require __DIR__ .'/user.php';
require __DIR__.'/contact.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';

Route::fallback(function () {
    return Inertia::render('PageNotFound');
});
