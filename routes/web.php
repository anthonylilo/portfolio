<?php

use App\Http\Controllers\AboutMeController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProgrammingLanguageController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home pública (no requiere login)
Route::get('/', function () {
    return Inertia::render('Pages/home/Home');
});

// Login/Logout (sólo si es guest, o sea no logueado)
Route::get('/login', [AuthController::class, 'showLogin'])->name('login')->middleware('guest');
Route::post('/login', [AuthController::class, 'login'])->middleware('guest');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Rutas protegidas (requieren login)
Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::get('/', function () {
        return Inertia::render('Pages/admin/Admin');
    });

    // About Me
    Route::get('/about-me', function () {
        return Inertia::render('components/admin/aboutme/AboutMe');
    })->name('admin.about-me');
    Route::post('/about-me/post', [AboutMeController::class, 'store']);
    Route::get('/about-me/data', [AboutMeController::class, 'getProfile']);
    Route::get('/about-me/edit/{id}', [AboutMeController::class, 'edit'])->name('aboutMe.edit');
    Route::put('/about-me/{id}', [AboutMeController::class, 'update'])->name('aboutMe.update');
    Route::delete('/about-me/delete/{id}', [AboutMeController::class, 'destroy']);

    // Experience
    Route::get('/experience', function () {
        return Inertia::render('components/admin/experience/Experience');
    });
    Route::post('/experience/post', [ExperienceController::class, 'store']);
    Route::get('/experience/data', [ExperienceController::class, 'getExperience']);
    Route::get('/experience/edit/{id}', [ExperienceController::class, 'edit'])->name('experience.edit');
    Route::put('/experience/{id}', [ExperienceController::class, 'update'])->name('experience.update');
    Route::delete('/experience/delete/{id}', [ExperienceController::class, 'destroy']);

    // Projects
    Route::get('/projects', function () {
        return Inertia::render('components/admin/projects/Projects');
    });
    Route::post('/projects/post', [ProjectController::class, 'store']);
    Route::get('/projects/data', [ProjectController::class, 'getProjects']);
    Route::get('/projects/edit/{id}', [ProjectController::class, 'edit'])->name('projects.edit');
    Route::put('/projects/{id}', [ProjectController::class, 'update'])->name('projects.update');
    Route::delete('/projects/delete/{id}', [ProjectController::class, 'destroy']);

    // Education
    Route::get('/education', function () {
        return Inertia::render('components/admin/education/Education');
    });
    Route::post('/education/post', [EducationController::class, 'store']);
    Route::get('/education/data', [EducationController::class, 'getEducations']);
    Route::get('/education/edit/{id}', [EducationController::class, 'edit'])->name('education.edit');
    Route::put('/education/{id}', [EducationController::class, 'update'])->name('education.update');
    Route::delete('/education/delete/{id}', [EducationController::class, 'destroy']);

    // Hire Me
    Route::get('/hire-me', function () {
        return Inertia::render('components/admin/hireme/HireMeEdit');
    });

    // Categorías y Lenguajes
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/programming-languages', [ProgrammingLanguageController::class, 'index']);

   // Users
    Route::get('/users', function () {
        return Inertia::render('components/admin/users/UserManagement');
    })->name('admin.users');
    Route::post('/users/post', [UserController::class, 'store']);
    Route::get('/users/data', [UserController::class, 'getUsers']);
    Route::get('/users/edit/{id}', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/delete/{id}', [UserController::class, 'destroy']);
});
