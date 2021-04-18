<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'email_verified_at' => date("Y-m-d"),
            'password' => '$2y$10$UmmhfbibUAhB5kG9NkWUb.7wBc37f5KeXu65FU9TQADwJDnNKTLP6',
            'remember_token' => Str::random(60),
            'created_at' => date("Y-m-d"),
            'updated_at' => date("Y-m-d"),
        ]);
    }
}
