<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\API\APIController as APIController;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UsersAPIController extends Controller
{
    public function index()
    {
        $users = User::latest()->cursorPaginate(16);
        return new UserResource($users);
    }

    public function store(StoreUserRequest $request)
    {
        $user = User::create([
            'username'     => $request['username'],
            'email'    => $request['email'],
            'password' => Hash::make($request['password']),
            'role_identifier' => $request['role_identifier'],
        ]);
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        if($request['password']) $request['password'] = Hash::make($request['password']);
        $validatedRequest = $request->validated();
        
        $imagePath = $request->file('profile_image');
        if ($imagePath) {
            $imageName = $imagePath->getClientOriginalName();
            $validatedRequest['profile_image'] = $imagePath->storeAs('images', $imageName, 'public');
            Storage::delete(['public/images/' . $user->profile_image]);
        }

        $user->update($validatedRequest);

        return new UserResource($user);
    }

    public function deleteImage(UpdateUserRequest $request, User $user)
    {
        $validatedRequest = $request->validated();
        $validatedRequest['profile_image'] = null;
        Storage::delete(['public/' . $user->profile_image]);
        $user->update($validatedRequest);
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return new UserResource($user);
    }
}