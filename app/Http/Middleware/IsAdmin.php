<?php

namespace App\Http\Middleware;

use App\Models\User;
use Auth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return redirect()->route('home')->with('error', 'Please log in first.');
        }

        if (Auth::user()->role !== User::ROLE_ADMIN) {
            return redirect()->route('account.dashboard')->with('error', "That page is for admins only");
        }

        return $next($request);
    }
}
