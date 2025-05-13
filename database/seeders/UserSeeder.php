<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'anthonylilo',
            'email' => 'anthonlilo@shirocompany.com',
            'password' => Hash::make('321'),
            'role' => 'admin',
            'status' => 'active',
        ]);
    }
}
