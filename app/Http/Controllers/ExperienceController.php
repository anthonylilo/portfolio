<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ExperienceController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'language' => 'required|string',
                'company' => 'required|string',
                'position' => 'required|string',
                'start_date' => 'required|date',
                'end_date' => 'nullable|date',
                'image' => 'nullable|file|mimes:jpg,jpeg,png,gif|max:2048',
                'description' => 'required|string',
            ]);

            // Manejo de la imagen
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $imagePath = $file->store('images', 'public');
                $validatedData['image'] = $imagePath;
            } else {
                $validatedData['image'] = null;
            }

            Experience::updateOrCreate(
                [
                    'language' => $validatedData['language'],
                    'company' => $validatedData['company'],
                    'position' => $validatedData['position'],
                    'start_date' => $validatedData['start_date'],
                ],
                [
                    'end_date' => $validatedData['end_date'],
                    'image' => $validatedData['image'],
                    'description' => $validatedData['description'],
                ]
            );

            return redirect()->back()->with('success', 'Experience added successfully.');
        } catch (\Exception $e) {
            Log::error("Error creating experience: " . $e->getMessage());
            return response()->json(['error' => 'An error occurred while saving the experience.'], 500);
        }
    }

    public function getExperience()
    {
        $aboutMe = Experience::all();
        return response()->json($aboutMe);
    }

    public function edit($id)
    {
        $experience = Experience::findOrFail($id);
        return Inertia::render('components/admin/experience/ExperienceEdit', [
            'experienceData' => [
                'id' => $experience->id,
                'language' => $experience->language,
                'position' => $experience->position,
                'company' => $experience->company,
                'start_date' => Carbon::parse($experience->start_date)->format('Y-m-d'),
                'end_date' => $experience->end_date ? Carbon::parse($experience->end_date)->format('Y-m-d') : '',
                'image' => $experience->image,
                'image' => $experience->image,
                'description' => $experience->description
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        // Inspeccionar los datos recibidos
        Log::info('Request payload:', ['data' => $request->all()]);
        Log::info('Raw content:', ['content' => $request->getContent()]);

        $validatedData = $request->validate([
            'language' => 'required|string',
            'company' => 'required|string',
            'position' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        // Encuentra la experiencia
        $experience = Experience::findOrFail($id);

        // Manejo de la imagen
        if ($request->hasFile('image')) {
            if ($experience->image) {
                Storage::disk('public')->delete($experience->image);
            }
            $path = $request->file('image')->store('images', 'public');
            $experience->image = $path;
        }

        $experience->language = $validatedData['language'];
        $experience->company = $validatedData['company'];
        $experience->position = $validatedData['position'];
        $experience->start_date = $validatedData['start_date'];
        $experience->end_date = $validatedData['end_date'];
        $experience->description = $validatedData['description'];

        $experience->save();

        return response()->json(['message' => 'Profile updated successfully!']);
    }

    public function destroy($id)
    {
        $experience = Experience::find($id);
        if (!$experience) {
            return response()->json(['error' => 'Experience not found'], 404);
        }

        $imagePath = public_path('storage/' . $experience->image);

        try {
            if ($experience->image && file_exists($imagePath)) {
                unlink($imagePath);
            }
            $experience->delete();
            Log::info("Experience deleted with ID: " . $id);
            return response()->json(['success' => 'Experience deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error("Error deleting experience: " . $e->getMessage());
            return response()->json(['error' => 'Error deleting experience'], 500);
        }
    }
}
