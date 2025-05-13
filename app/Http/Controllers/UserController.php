<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required|in:admin,editor,guest',
            'status' => 'required|in:active,inactive',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'status' => $validated['status'],
        ]);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function getUsers()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('components/admin/users/UserEdit', ['user' => $user]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => "required|email|unique:users,email,{$user->id}",
            'role' => 'required|in:admin,editor,guest',
            'status' => 'required|in:active,inactive',
        ]);

        $user->update($validated);

        return response()->json(['message' => 'User updated successfully!']);
    }

    public function destroy($id)
    {
        Log::info("Deleting user with ID: " . $id);
        $user = User::find($id);
        if (!$user) {
            Log::error("User not found with ID: " . $id);
            return response()->json(['error' => 'User not found'], 404);
        }

        try {
            $user->delete();
            Log::info("User deleted with ID: " . $id);
            return response()->json(['success' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            Log::error("Error deleting user: " . $e->getMessage());
            return response()->json(['error' => 'Error deleting user'], 500);
        }
    }
}
