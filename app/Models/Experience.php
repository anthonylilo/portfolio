<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $table = 'experience';
    protected $fillable = ['language', 'company', 'position', 'start_date', 'end_date', 'image', 'description'];

}
