<?php

namespace Database\Seeders;

use App\Models\ProgrammingLanguage;
use Illuminate\Database\Seeder;

class ProgrammingLanguageSeeder extends Seeder
{
    public function run()
    {
        $languages = ['PHP', 'JavaScript', 'Vue.js', 'React', 'Laravel', 'Node.js', 'Python'];

        foreach ($languages as $lang) {
            ProgrammingLanguage::firstOrCreate(['name' => $lang]);
        }
    }
}
