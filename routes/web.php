<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home/Home');
});

Route::get('/admin', function () {
    return Inertia::render('admin/Admin');
});
