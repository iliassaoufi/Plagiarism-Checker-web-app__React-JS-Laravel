<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plagiat extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'text_path',
        'result_path',
        'is_plagiat',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}