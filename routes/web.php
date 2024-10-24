<?php

use App\Http\Controllers\AboutMeController;
use App\Http\Controllers\ExperienceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Pages/home/Home');
});

Route::get('/admin', function () {
    return Inertia::render('Pages/admin/Admin');
});

Route::get('/admin/about-me', function () {
    return Inertia::render('components/admin/aboutme/AboutMe');
})->name('admin.about-me');

Route::post('/admin/about-me/post', [AboutMeController::class, 'store']);
Route::get('/admin/about-me/data', [AboutMeController::class, 'getProfile']);
Route::get('/admin/about-me/edit/{id}', [AboutMeController::class, 'edit'])->name('aboutMe.edit');
Route::put('/admin/about-me/{id}', [AboutMeController::class, 'update'])->name('aboutMe.update');
Route::delete('/admin/about-me/delete/{id}', [AboutMeController::class, 'destroy']);

Route::get('/admin/experience', function () {
    return Inertia::render('components/admin/experience/Experience');
});

Route::post('/admin/experience/post', [ExperienceController::class, 'store']);
Route::get('/admin/experience/data', [ExperienceController::class, 'getExperience']);
Route::get('/admin/experience/edit/{id}', [ExperienceController::class, 'edit'])->name('experience.edit');
Route::put('/admin/experience/{id}', [ExperienceController::class, 'update'])->name('experience.update');
Route::delete('/admin/experience/delete/{id}', [ExperienceController::class, 'destroy']);

Route::get('/admin/projects', function () {
    return Inertia::render('components/admin/projects/ProjectsEdit');
});

Route::get('/admin/education', function () {
    return Inertia::render('components/admin/education/EducationEdit');
});

Route::get('/admin/hire-me', function () {
    return Inertia::render('components/admin/hireme/HireMeEdit');
});
