<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Education extends Model
{
    use HasFactory;

    protected $fillable = [
        'language',
        'provider',
        'title_course',
        'link',
        'start_date',
        'end_date',
        'image'
    ];

    public function programmingLanguages()
    {
        return $this->belongsToMany(ProgrammingLanguage::class, 'education_programming_language');
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_education');
    }
}
