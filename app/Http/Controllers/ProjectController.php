<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\ProgrammingLanguage;
use App\Models\Category;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'language' => 'required|string|max:10',
                'short_description' => 'required|string',
                'links' => 'required|json',
                'programming_languages' => 'required|json',
                'categories' => 'required|json',
                'image' => 'nullable|file|mimes:jpg,jpeg,png,gif,webp|max:2048',
            ]);

            $links = json_decode($validatedData['links'], true);
            $programmingLanguages = json_decode($validatedData['programming_languages'], true);
            $categories = json_decode($validatedData['categories'], true);

            // Guardar imagen si existe
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public');
            }

            // Crear el proyecto base
            $project = Project::create([
                'name' => $validatedData['name'],
                'language' => $validatedData['language'],
                'short_description' => $validatedData['short_description'],
                'links' => $links,
                'image' => $imagePath,
            ]);

            // Relacionar lenguajes y categorías
            $project->programmingLanguages()->attach($programmingLanguages);
            $project->categories()->attach($categories);

            return response()->json(['success' => 'Project created successfully.'], 200);
        } catch (\Exception $e) {
            Log::error("Error creating project: " . $e->getMessage());
            return response()->json(['error' => 'An error occurred while saving the project.'], 500);
        }
    }

    public function getProjects()
    {
        return response()->json(Project::all());
    }

    public function edit($id)
    {
        $project = Project::with(['categories:id', 'programmingLanguages:id'])->findOrFail($id);

        return Inertia::render('components/admin/projects/ProjectsEdit', [
            'projectData' => [
                'id' => $project->id,
                'name' => $project->name,
                'language' => $project->language,
                'short_description' => $project->short_description,
                'links' => $project->links,
                'programming_languages' => $project->programmingLanguages->pluck('id')->toArray(),
                'categories' => $project->categories->pluck('id')->toArray(),
                'image' => $project->image,
            ],
            'programmingLanguageOptions' => ProgrammingLanguage::select('id', 'name')->get(),
            'categoryOptions' => Category::select('id', 'name')->get(),
        ]);
    }


    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'language' => 'required|string|max:10',
                'short_description' => 'required|string',
                'links' => 'required|json',
                'programming_languages' => 'required|json',
                'categories' => 'required|json',
                'image' => 'nullable|image|max:2048',
            ]);

            $links = json_decode($validatedData['links'], true);
            $programmingLanguages = json_decode($validatedData['programming_languages'], true);
            $categories = json_decode($validatedData['categories'], true);

            $project = Project::findOrFail($id);

            if ($request->hasFile('image')) {
                if ($project->image) {
                    Storage::disk('public')->delete($project->image);
                }
                $project->image = $request->file('image')->store('images', 'public');
            }

            $project->name = $validatedData['name'];
            $project->language = $validatedData['language'];
            $project->short_description = $validatedData['short_description'];
            $project->links = $links;
            $project->save();

            $project->programmingLanguages()->sync($programmingLanguages);
            $project->categories()->sync($categories);

            return response()->json(['message' => 'Project updated successfully!']);
        } catch (\Exception $e) {
            Log::error("Error updating project: " . $e->getMessage());
            return response()->json(['error' => 'An error occurred while updating the project.'], 500);
        }
    }


    public function destroy($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }

        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        try {
            $project->delete();
            Log::info("Project deleted with ID: " . $id);
            return response()->json(['success' => 'Project deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error("Error deleting project: " . $e->getMessage());
            return response()->json(['error' => 'Error deleting project'], 500);
        }
    }
}
