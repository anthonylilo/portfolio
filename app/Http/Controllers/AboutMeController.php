<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AboutMe;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AboutMeController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'profile' => 'required|string',
            'language' => 'required|string',
        ]);

        AboutMe::updateOrCreate(
            ['profile' => $validatedData['profile']],
            ['language' => $validatedData['language']]
        );

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

    public function getProfile()
    {
        $aboutMe = AboutMe::all();
        return response()->json($aboutMe);
    }

    public function edit($id)
    {
        $aboutMe = AboutMe::findOrFail($id);
        return Inertia::render('components/admin/aboutme/AboutMeEdit', [
            'aboutMe' => $aboutMe
        ]);
    }

    public function update(Request $request, $id)
    {
        // Valida los datos
        $validatedData = $request->validate([
            'profile' => 'required|string',
            'language' => 'required|string',
        ]);

        // Actualiza el registro
        $aboutMe = AboutMe::findOrFail($id);
        $aboutMe->profile = $validatedData['profile'];
        $aboutMe->language = $validatedData['language'];
        $aboutMe->save();

        return response()->json(['message' => 'Profile updated successfully!']);
    }

    public function destroy($id)
    {
        Log::info("Deleting profile with ID: " . $id);
        $aboutMe = AboutMe::find($id);
        if (!$aboutMe) {
            Log::error("Profile not found with ID: " . $id);
            return response()->json(['error' => 'Profile not found'], 404);
        }

        try {
            $aboutMe->delete();
            Log::info("Profile deleted with ID: " . $id);
            return response()->json(['success' => 'Profile deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error("Error deleting profile: " . $e->getMessage());
            return response()->json(['error' => 'Error deleting profile'], 500);
        }
    }
}
