<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AboutMe;
use Illuminate\Support\Facades\Log;

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
