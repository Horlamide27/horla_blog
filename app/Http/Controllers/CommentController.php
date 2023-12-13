<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
    public function store(Request $request, string $id) {
        // validate request
        $request->validate([
            'content' => 'required',
        ]);
        //create post
        $comment = new Comment;
        $comment->content = $request->all()["content"];
        $comment->user()->associate($request->user()->id);
        $comment->post()->associate($id);
        $comment->save();
        return Redirect::route('posts.show', ['id' => $id]);
    }
    public function destroy(string $post_id, string $id) {
        $comment = Comment::find($id);
        $comment->delete();
        return Redirect::route('posts.show', ['id' => $post_id]);
    }
}
