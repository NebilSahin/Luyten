<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostsAPIController extends Controller
{
    public function index()
    {
        $posts = Post::with(['creator'])->latest()->cursorPaginate(16);
        return new PostResource($posts);
    }
    public function showMyPosts()
    {
        $user_id = Auth::user()->id;
        $posts = Post::where('user_identifier', $user_id)->with(['creator'])->latest()->cursorPaginate(16);
        return new PostResource($posts);
    }
    public function store(StorePostRequest $request)
    {
        $validatedRequest = $request->validated();
        $imagePath = $request->file('post_image');
        $imageName = $imagePath ? $imagePath->getClientOriginalName() : null;
        $validatedRequest['post_image'] = $imagePath ? $imagePath->storeAs('images', $imageName, 'public') : null;
        $validatedRequest['user_identifier'] = Auth::user()->id;
        $posts = Post::create($validatedRequest);
        return new PostResource($posts);
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $validatedRequest = $request->validated();

        $imagePath = $request->file('post_image');
        if ($imagePath) {
            $imageName = $imagePath->getClientOriginalName();
            $validatedRequest['post_image'] = $imagePath->storeAs('images', $imageName, 'public');
            Storage::delete(['public/images/' . $post->post_image]);
        }

        $post->update($validatedRequest);
        return new PostResource($post);
    }

    public function deleteImage(UpdatePostRequest $request, Post $post)
    {
        $validatedRequest = $request->validated();
        $validatedRequest['post_image'] = null;
        Storage::delete(['public/' . $post->post_image]);
        $post->update($validatedRequest);
        return new PostResource($post);
    }

    public function search(Request $request)
    {
        $searchResult = Post::search($request->search_text)->query(fn ($query) => $query->with('creator'))->paginate(16);
        return new PostResource($searchResult);
    }

    public function destroy(Post $post)
    {
        Storage::delete(['public/' . $post->post_image]);
        $post->delete();
        return new PostResource($post);
    }
}