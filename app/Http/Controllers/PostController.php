<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Image;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller {
    /**
     * Display a listing of the resource.
     */
//    public function index() {
//        $posts = Post::all();
//        return Inertia::render('Posts/Posts', [
//            'posts' => $posts,
//        ]);
//    }

    /**
     * show posts for a user
     */
    public function userIndex(string $id) {
        $posts = Post::where("user_id", $id)->get();
        $comments = Comment::where("user_id", $id)->get();
        foreach ($posts as $post) {
            $post->user;
        }
        return Inertia::render('Posts/Posts', [
            'posts' => $posts,
            'comments' => $comments,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('Posts/CreatePost');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        // validate request
        $request->validate([
            'title' => 'required',
            'body' => 'required',
            'anime_id' => 'nullable',
        ]);
        //create post
        $post = new Post;
        $post->title = $request->all()["title"];
        $post->body = $request->all()["body"];
        $post->user()->associate($request->user()->id);
        if($request->all()["anime_id"] != null){
            $post->anime()->associate($request->all()["anime_id"]);
        }
        $post->save();

        return Redirect::route('posts.show', ['id' => $post->id]);

    }
    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        $post = Post::findorFail($id);
        $post->comments;
        foreach ($post->comments as $comment) {
            $comment->user;
        }
        $post->anime;

        return Inertia::render('Posts/ShowPost', [
            'post' => $post,
            'author'=>$post->user->name,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {
        return Inertia::render('Posts/EditPost', [
            'post' => Post::findorFail($id),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id) {
        //validate request
        $request->validate([
            'title' => 'required',
            'body' => 'required',
        ]);
        //use edit-post policy to authorize user
        $post = Post::findorFail($id);
        $authorized = Gate::inspect('update', $post);
        if (!$authorized->allowed()) {
            abort(403, 'You cannot edit this post.');
        }
        $post->title = $request->all()["title"];
        $post->text = $request->all()["body"];
        $post->save();
        return Redirect::route('posts.show', ['id' => $post->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        $post = Post::findorFail($id);
//        $authorized = Gate::inspect('delete', $post);
//        if ($authorized->allowed()) {
            foreach ($post->comments as $comment) {
                $comment->delete();
            }
            $post->delete();
            return Redirect::route('dashboard');
//        }
//        abort(403, 'You cannot delete this post.');

    }
}
