<?php

use App\Http\Controllers\ContactController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/video', function () {
    return Inertia::render('video/VideoPage');
});

/**
 * Deprecate these, move these to vitepress documentation
 */
Route::get('about', function () {
    return Inertia::render('public/About');
})->name('about');

Route::get('roadmap', function () {
    return Inertia::render('public/RoadMap');
})->name('roadmap');

Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');
