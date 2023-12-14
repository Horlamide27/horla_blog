<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/image/{picture}', function ($filename) {
    return response()->file(storage_path('app/public/images/' . $filename));
})->name('images.image');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//route group for animes
Route::middleware( ['auth', 'verified'])->group(function () {
    Route::get('/animes', [AnimeController::class, 'index'])->name('animes.index');
    Route::get('/animes/user/{id}', [AnimeController::class, 'userIndex'])->name('animes.user-index');
    Route::get('/animes/create', [AnimeController::class, 'create'])->name('animes.create');
    Route::post('/animes', [AnimeController::class, 'store'])->name('animes.store');
    Route::get('/animes/{id}', [AnimeController::class, 'show'])->name('animes.show');
    Route::get('/animes/{id}/edit', [AnimeController::class, 'edit'])->name('animes.edit');
    Route::patch('/animes/{id}', [AnimeController::class, 'update'])->name('animes.update');
    Route::delete('/animes/{id}', [AnimeController::class, 'destroy'])->name('animes.destroy');
});

//route group for posts
Route::middleware( ['auth', 'verified'])->group(function () {
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::patch('/posts/{id}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::post('/posts/{post_id}/comment', [CommentController::class, 'store'])->name('posts.comment.store');
    Route::delete('/posts/{id}/comment/{comment_id}', [CommentController::class, 'destroy'])->name('posts.comment.destroy');
});
Route::get('/posts/user/{id}', [PostController::class, 'userIndex'])->name('posts.user-index');
Route::get('/posts', [PostController::class, 'index'])->name('posts.index');
Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
Route::get('/posts/{id}', [PostController::class, 'show'])->name('posts.show');
Route::get('/posts/{id}/comments', [PostController::class, 'comments'])->name('posts.comments');


require __DIR__.'/auth.php';
