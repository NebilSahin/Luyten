<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthAPIController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'username' => $request['username'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        $token = $user->createToken('user_token')->plainTextToken;

        return response()->json(['user' => $user, 'access_token' => $token]);
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->orWhere('username', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'Unauthorised.',
                ['error' => 'User is not found or Password is incorrect']
            ]);
        }

        return response()->json(['user' => $user, 'access_token' => $user->createToken('user_token')->plainTextToken]);
    }

    public function details()
    {
        $user = Auth::user();
        return response()->json(['user' => $user]);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = Auth::user();
        $user['password'] = Hash::make($request['password']);
        $user->save();

        return response()->json(['user' => $user]);
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = Auth::user();
        if($request['password']) $request['password'] = Hash::make($request['password']);
        $user->update($request->all());

        return response()->json(['user' => $user]);
    }

    public function destroy()
    {
        $user = Auth::user();
        $user->delete();

        return response()->json(['user' => $user]);
    }
}