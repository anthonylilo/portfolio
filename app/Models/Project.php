<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'language',
        'short_description',
        'image',
        'links'
    ];

    protected $casts = [
        'links' => 'array',
    ];

    public function programmingLanguages()
    {
        return $this->belongsToMany(ProgrammingLanguage::class, 'project_programming_language');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_project');
    }
}
