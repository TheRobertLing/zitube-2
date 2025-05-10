<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class UserDashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('user/Dashboard');
    }
}
