<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'lingrobert929@gmail.com'],
            [
                'name' => 'Robert Ling',
                'password' => Hash::make(env('APP_ADMIN_PASSWORD')),
                'role' => User::ROLE_ADMIN,
            ]
        );
    }
}
