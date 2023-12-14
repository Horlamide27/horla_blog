<?php

namespace App\Http\Controllers;

use App\Events\CommentEvent;
use App\Events\NewCommentEvent;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
    public function store(Request $request, string $post_id) {
        // validate request
        $request->validate([
            'content' => 'required',
        ]);
        //create post
        $comment = new Comment;
        $comment->content = $request->all()["content"];
        $comment->user()->associate($request->user()->id);
        $comment->post()->associate($post_id);
        $comment->save();
        if ($request->user()->id !== $post_id) {
            CommentEvent::dispatch($comment->user->name, Post::find($post_id)->user);
        }
        return Redirect::route('posts.show', ['id' => $post_id]);
    }
    public function destroy(string $post_id, string $id) {
        $comment = Comment::find($id);
        $comment->delete();
        return Redirect::route('posts.show', ['id' => $post_id]);
    }
}
