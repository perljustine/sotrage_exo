<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class UploadController extends Controller
{
    public function index(): Response
    {
        $uploads = Upload::latest()->get();
        return Inertia::render('Admin/Upload/Index', [
            'uploads' => $uploads,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'file' => 'required|file|max:10240', // max 10MB
        ]);

        $path = $request->file('file')->store('uploads');

        $upload = Upload::create([
            'name' => $request->file('file')->getClientOriginalName(),
            'path' => $path,
        ]);

        return redirect()->route('admin.upload')->with('success', 'Fichier uploadé');
    }

    public function show(Upload $file): Response
    {
        return Inertia::render('Admin/Upload/Show', [
            'file' => $file,
        ]);
    }

    public function edit(Upload $file): Response
    {
        return Inertia::render('Admin/Upload/Edit', [
            'file' => $file,
        ]);
    }

    public function update(Request $request, Upload $file): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $file->update([
            'name' => $request->name,
        ]);

        return redirect()->route('admin.upload')->with('success', 'Fichier mis à jour');
    }

    public function destroy(Upload $file): RedirectResponse
    {
        Storage::delete($file->path);
        $file->delete();

        return redirect()->route('admin.upload')->with('success', 'Fichier supprimé');
    }

    public function download(Upload $file)
    {
        return Storage::download($file->path, $file->name);
    }

    public function preview(Upload $file)
    {
        return response()->file(storage_path('app/' . $file->path));
    }

    public function delete(Upload $file): Response
    {
        return Inertia::render('Admin/Upload/Delete', [
            'file' => $file,
        ]);
    }
}
