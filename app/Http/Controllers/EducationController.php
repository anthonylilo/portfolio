<?php

namespace App\Http\Controllers;

use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\ProgrammingLanguage;
use App\Models\Category;

class EducationController extends Controller
{
    public function index()
    {
        return Inertia::render('components/admin/education/Education', [
            'educations' => Education::with(['categories:id,name', 'programmingLanguages:id,name'])->get(),
            'categoryOptions' => Category::select('id', 'name')->get(),
            'programmingLanguageOptions' => ProgrammingLanguage::select('id', 'name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'provider' => 'required|string|max:255',
                'title_course' => 'required|string|max:255',
                'language' => 'required|string|max:10',
                'link' => 'required|string',
                'programming_languages' => 'required|json',
                'categories' => 'required|json',
                'image' => 'nullable|file|mimes:jpg,jpeg,png,gif,webp|max:2048',
            ]);

            $link = $validatedData['link'];
            $programmingLanguages = json_decode($validatedData['programming_languages'], true);
            $categories = json_decode($validatedData['categories'], true);

            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public');
            }

            $education = Education::create([
                'provider' => $validatedData['provider'],
                'title_course' => $validatedData['title_course'],
                'language' => $validatedData['language'],
                'link' => $link,
                'start_date' => $request->input('start_date'),
                'end_date' => $request->input('end_date'),
                'image' => $imagePath,
            ]);

            $education->programmingLanguages()->attach($programmingLanguages);
            $education->categories()->attach($categories);

            return response()->json(['success' => 'Education created successfully.'], 200);
        } catch (\Exception $e) {
            Log::error("Error creating education: " . $e->getMessage());
            return response()->json(['error' => 'An error occurred while saving the education.'], 500);
        }
    }

    public function getEducations()
    {
        $education = Education::all();
        return response()->json($education);
    }

    public function edit($id)
    {
        $education = Education::with([
            'categories:id,name',
            'programmingLanguages:id,name'
        ])->findOrFail($id);

        return Inertia::render('components/admin/education/EducationEdit', [
            'educationData' => [
                'id' => $education->id,
                'provider' => $education->provider,
                'title_course' => $education->title_course,
                'language' => $education->language,
                'start_date' => $education->start_date,
                'end_date' => $education->end_date,
                'link' => $education->link,
                'links' => [$education->link],
                'programming_languages' => $education->programmingLanguages->pluck('id')->toArray(),
                'categories' => $education->categories->pluck('id')->toArray(),
                'image' => $education->image,
            ],
            'programmingLanguageOptions' => ProgrammingLanguage::select('id', 'name')->get(),
            'categoryOptions' => Category::select('id', 'name')->get(),
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'provider' => 'required|string|max:255',
                'title_course' => 'required|string|max:255',
                'language' => 'required|string|max:10',
                'link' => 'required|string',
                'programming_languages' => 'required|json',
                'categories' => 'required|json',
                'image' => 'nullable|image|max:2048',
            ]);

            $link = $validatedData['link'];
            $programmingLanguages = json_decode($validatedData['programming_languages'], true);
            $categories = json_decode($validatedData['categories'], true);

            $education = Education::findOrFail($id);

            if ($request->hasFile('image')) {
                $imageFile = $request->file('image');

                if (!$imageFile->isValid()) {
                    throw new \Exception('Archivo de imagen no válido.');
                }

                if ($education->image) {
                    Storage::disk('public')->delete($education->image);
                }

                $education->image = $imageFile->store('images', 'public');
            }

            $education->provider = $validatedData['provider'];
            $education->title_course = $validatedData['title_course'];
            $education->language = $validatedData['language'];
            $education->link = $link;
            $education->save();

            $education->programmingLanguages()->sync($programmingLanguages);
            $education->categories()->sync($categories);

            return response()->json(['message' => 'Education updated successfully!']);
        } catch (\Exception $e) {
            Log::error("Error updating education: " . $e->getMessage());
            return response()->json(['error' => 'An error occurred while updating the education.'], 500);
        }
    }

    public function destroy($id)
    {
        $education = Education::find($id);
        if (!$education) {
            return response()->json(['error' => 'Education not found'], 404);
        }

        if ($education->image) {
            Storage::disk('public')->delete($education->image);
        }

        try {
            $education->programmingLanguages()->detach();
            $education->categories()->detach();
            $education->delete();
            Log::info("Education deleted with ID: " . $id);
            return response()->json(['success' => 'Education deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error("Error deleting education: " . $e->getMessage());
            return response()->json(['error' => 'Error deleting education'], 500);
        }
    }
}
