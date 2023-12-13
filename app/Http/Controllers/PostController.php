<?php

namespace App\Http\Controllers;

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
    public function index() {
        $posts = Post::all();
        return Inertia::render('Posts/Posts', [
            'posts' => $posts,
        ]);
    }

    /**
     * show posts for a user
     */
    public function userIndex(string $id) {
        $posts = Post::where("user_id", $id)->get();
//        foreach ($posts as $post) {
//            $post->;
//        }
        return Inertia::render('Posts/Posts', [
            'posts' => $posts,
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
        $post->anime;

class PostController extends Controller
{
    //
}
