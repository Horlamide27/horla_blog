<?php

namespace App\Http\Controllers;

use App\Models\Anime;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AnimeController extends Controller
{
    public function create() {
        return Inertia::render('Anime/CreateAnime');
    }
    public function store(Request $request){
        $request->validate([
            'title' => 'required',
            'about' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $anime = new Anime;
        $anime->title = $request->all()["title"];
        $anime->about = $request->all()["about"];
        $anime->user()->associate($request->user()->id);
        $image = $request->file('image');
        $image->storeAs('images', $image->getClientOriginalName(), 'public');
        $img = new Image;
        $img->path = $image->getClientOriginalName();
        $anime->save();
        $img->imageable()->associate($anime);
        $img->save();

        return Redirect::route('animes.show', ['id' => $anime->id]);
    }
    public function show(string $id){
        $anime = Anime::find($id);
        $anime->cover;
        return Inertia::render('Anime/AnimeShow', [
            'anime' => $anime,
        ]);
    }
}
