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

class UsersAPIController extends Controller
{
    public function index()
    {
        $users = User::latest()->cursorPaginate(15);
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
        $user->update($request->all());

        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return new UserResource($user);
    }
}