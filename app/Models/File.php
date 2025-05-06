<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class File extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'path',
        'type',
        'size',
        'is_url',
        'url'
    ];

    protected $appends = ['full_path', 'is_image'];

    public function getFullPathAttribute()
    {
        if ($this->is_url) {
            return $this->url;
        }
        
        return asset('storage/' . $this->path);
    }

    public function getIsImageAttribute()
    {
        $imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
        $extension = pathinfo($this->path, PATHINFO_EXTENSION);
        
        return in_array(strtolower($extension), $imageExtensions) || 
               (strpos($this->type, 'image/') === 0);
    }

    public function delete()
    {
        if (!$this->is_url && $this->path) {
            Storage::disk('public')->delete($this->path);
        }
        
        return parent::delete();
    }
}