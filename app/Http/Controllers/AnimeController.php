<?php

namespace App\Http\Controllers;

use App\Models\Anime;
use App\Models\Genre;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AnimeController extends Controller
{
    public function userIndex(string $id){
        $animes = Anime::where("user_id", $id)->get();
        foreach ($animes as $anime) {
            $anime->cover;
            $anime->genres;
        }
        return Inertia::render('Anime/UserIndex',['animes' => $animes]);

    }
    public function create() {
        return Inertia::render('Anime/CreateAnime');
    }
    public function store(Request $request){
        $request->validate([
            'title' => 'required',
            'about' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'genres' => 'required|array',
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

        //associate anime with genres
        foreach ($request->all()["genres"] as $g) {
            if(!Genre::where("name", $g)->exists()){
                $anime->genres()->create(["name" => $g]);
            }else{
                $anime->genres()->attach(Genre::where("name", $g)->first());
            }
        }

        return Redirect::route('animes.show', ['id' => $anime->id]);
    }
    public function show(string $id){
        $anime = Anime::find($id);
        $anime->cover;
        $anime->genres;
        return Inertia::render('Anime/AnimeShow', [
            'anime' => $anime,
        ]);
    }
    public function edit(string $id){
        $anime = Anime::find($id);
        return Inertia::render('Anime/EditAnime', [
            'anime' => $anime,
        ]);
    }
    public function update (Request $request, string $id){
        $request->validate([
            'title' => 'nullable',
            'about' => 'nullable',
        ]);
        $anime = Anime::find($id);
        if($request->has('title')){
            $anime->title = $request->all()["title"];
        }
        if($request->has('about')){
            $anime->about = $request->all()["about"];
        }
        $anime->save();
        return Redirect::route('animes.show', ['id' => $anime->id]);
    }
    public function destroy(string $id){
        if(!Anime::find($id)){
            return Redirect::route('animes.user-index', ['id' => auth()->user()->id]);
        }
        $anime = Anime::find($id);
        $anime->delete();
        return Redirect::route('animes.user-index', ['id' => auth()->user()->id]);
    }
}
