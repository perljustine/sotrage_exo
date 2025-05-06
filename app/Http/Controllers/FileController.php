<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class FileController extends Controller
{
    public function index()
    {
        $files = File::latest()->get();
        
        return Inertia::render('Admin/Files/Index', [
            'files' => $files
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Files/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'nullable|file|max:10240', // 10MB max
            'url' => 'nullable|url',
            'name' => 'required|string|max:255',
        ]);

        // Ensure at least one of file or URL is provided
        if (!$request->hasFile('file') && !$request->filled('url')) {
            return back()->withErrors(['error' => 'You must provide either a file or a URL']);
        }

        $file = new File();
        $file->name = $request->name;

        if ($request->hasFile('file')) {
            $uploadedFile = $request->file('file');
            $path = $uploadedFile->store('files', 'public');
            
            $file->path = $path;
            $file->type = $uploadedFile->getMimeType();
            $file->size = $uploadedFile->getSize();
            $file->is_url = false;
        } elseif ($request->filled('url')) {
            $file->url = $request->url;
            $file->type = 'url';
            $file->is_url = true;
        }

        $file->save();

        return redirect()->route('admin.files.index')->with('success', 'File uploaded successfully');
    }

    public function destroy(File $file)
    {
        $file->delete();
        
        return redirect()->route('admin.files.index')->with('success', 'File deleted successfully');
    }

    public function edit(File $file)
    {
        return Inertia::render('Admin/Files/Edit', [
            'file' => $file
        ]);
    }

    public function update(Request $request, File $file)
    {
        $request->validate([
            'file' => 'nullable|file|max:10240', // 10MB max
            'url' => 'nullable|url',
            'name' => 'required|string|max:255',
        ]);

        $file->name = $request->name;

        if ($request->hasFile('file')) {
            // Delete old file if it exists and is not a URL
            if (!$file->is_url && $file->path) {
                Storage::disk('public')->delete($file->path);
            }

            $uploadedFile = $request->file('file');
            $path = $uploadedFile->store('files', 'public');
            
            $file->path = $path;
            $file->type = $uploadedFile->getMimeType();
            $file->size = $uploadedFile->getSize();
            $file->is_url = false;
            $file->url = null;
        } elseif ($request->filled('url') && ($file->is_url || $request->url !== $file->url)) {
            // Delete old file if it exists and is not a URL
            if (!$file->is_url && $file->path) {
                Storage::disk('public')->delete($file->path);
            }

            $file->url = $request->url;
            $file->type = 'url';
            $file->is_url = true;
            $file->path = null;
        }

        $file->save();

        return redirect()->route('admin.files.index')->with('success', 'File updated successfully');
    }

    public function download(File $file)
    {
        if ($file->is_url) {
            return redirect($file->url);
        }

        return response()->download(storage_path('app/public/' . $file->path), $file->name);
    }
}