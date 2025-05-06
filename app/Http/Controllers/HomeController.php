<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $files = File::latest()->get();
        $imageFiles = $files->filter(function ($file) {
            return $file->is_image;
        });
        
        $otherFiles = $files->filter(function ($file) {
            return !$file->is_image;
        });

        return Inertia::render('Home', [
            'imageFiles' => $imageFiles,
            'otherFiles' => $otherFiles
        ]);
    }
}