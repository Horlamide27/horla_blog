<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Anime extends Model
{
    use HasFactory;

    public function posts(): HasMany {
        return $this->hasMany(Post::class);
    }
    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
    public function cover(): MorphOne {
        return $this->morphOne(Image::class, 'imageable');
    }
}
