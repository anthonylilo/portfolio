<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Experience;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'language' => 'required|string',
            'company' => 'required|string',
            'position' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'image' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048',
            'description' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $imagePath = $file->store('images', 'public');
            $validatedData['image'] = $imagePath;
        }

        Experience::updateOrCreate(
            ['language' => $validatedData['language']],
            [
                'company' => $validatedData['company'],
                'position' => $validatedData['position'],
                'start_date' => $validatedData['start_date'],
                'end_date' => $validatedData['end_date'],
                'image' => $validatedData['image'] ?? null,
                'description' => $validatedData['description'],
            ]
        );

        return redirect()->back()->with('success', 'Experience added successfully.');
    }


    public function getExperience()
    {
        $aboutMe = Experience::all();
        return response()->json($aboutMe);
    }

    public function edit($id)
    {
        $aboutMe = Experience::findOrFail($id);
        return Inertia::render('components/admin/aboutme/ExperienceEdit', [
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
        $aboutMe = Experience::findOrFail($id);
        $aboutMe->profile = $validatedData['profile'];
        $aboutMe->language = $validatedData['language'];
        $aboutMe->save();

        return response()->json(['message' => 'Profile updated successfully!']);
    }

    public function destroy($id)
    {
        Log::info("Deleting profile with ID: " . $id);
        $aboutMe = Experience::find($id);
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
