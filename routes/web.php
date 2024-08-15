<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home/Home');
});

Route::get('/admin', function () {
    return Inertia::render('Pages/admin/Admin');
});

Route::get('/admin/about-me', function () {
    return Inertia::render('components/admin/aboutme/AboutMeEdit');
});

Route::get('/admin/experience', function () {
    return Inertia::render('components/admin/experience/ExperienceEdit');
});

Route::get('/admin/projects', function () {
    return Inertia::render('components/admin/projects/ProjectsEdit');
});

Route::get('/admin/education', function () {
    return Inertia::render('components/admin/education/EducationEdit');
});

Route::get('/admin/hire-me', function () {
    return Inertia::render('components/admin/hireme/HireMeEdit');
});
