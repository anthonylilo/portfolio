<?php

namespace App\Http\Controllers;

use App\Models\ProgrammingLanguage;

class ProgrammingLanguageController extends Controller
{
    public function index()
    {
        return response()->json(ProgrammingLanguage::select('id', 'name')->get());
    }
}
