<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UploadController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Page d'accueil
Route::get('/', [HomeController::class, 'index'])->name('home');

// Routes protégées par auth & verified
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Admin panel
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Files
    Route::get('/files', [FileController::class, 'index'])->name('files.index');
    Route::get('/files/create', [FileController::class, 'create'])->name('files.create');
    Route::post('/files', [FileController::class, 'store'])->name('files.store');
    Route::get('/files/{file}/edit', [FileController::class, 'edit'])->name('files.edit');
    Route::put('/files/{file}', [FileController::class, 'update'])->name('files.update');
    Route::delete('/files/{file}', [FileController::class, 'destroy'])->name('files.destroy');
    Route::get('/files/{file}/download', [FileController::class, 'download'])->name('files.download');

    // Uploads
    Route::get('/upload', [UploadController::class, 'index'])->name('upload');
    Route::post('/upload', [UploadController::class, 'store'])->name('upload.store');
    Route::get('/upload/{file}', [UploadController::class, 'show'])->name('upload.show');
    Route::get('/upload/{file}/edit', [UploadController::class, 'edit'])->name('upload.edit');
    Route::put('/upload/{file}', [UploadController::class, 'update'])->name('upload.update');
    Route::delete('/upload/{file}', [UploadController::class, 'destroy'])->name('upload.destroy');
    Route::get('/upload/{file}/download', [UploadController::class, 'download'])->name('upload.download');
    Route::get('/upload/{file}/preview', [UploadController::class, 'preview'])->name('upload.preview');
    Route::get('/upload/{file}/delete', [UploadController::class, 'delete'])->name('upload.delete');
});

// Autres fichiers de routes
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
