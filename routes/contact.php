<?php

use App\Http\Controllers\ContactController;

Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');
