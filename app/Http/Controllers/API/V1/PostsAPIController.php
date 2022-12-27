<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use App\Http\Controllers\Controller;

class PostsAPIController extends Controller
{
    public function index()
    {
        $posts = Post::with(['creator'])->latest()->cursorPaginate(15);
        return new PostResource($posts);
    }

    public function store(StorePostRequest $request)
    {
        $validatedRequest = $request->validated();
        $validatedRequest['file_path'] = $request->file('file_path')->store('image', 'public');
        $posts = Post::create($validatedRequest);
        return new PostResource($posts);
    }

    public function show(Post $post)
    {
        return new PostResource($post);
    }

    public function update(StorePostRequest $request, Post $post)
    {
        $post->update($request->all());
        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();
        return new PostResource($post);
    }
}