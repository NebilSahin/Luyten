<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\APIController as APIController;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
class AuthAPIController extends APIController
{
    public function register(RegisterRequest $request)
    {
        $user =  User::create([
            'username'     => $request['username'],
            'email'    => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        $token = $user->createToken('user_token')->plainTextToken;
        
        return $this->sendResponse(['user' => $user, 'access_token' => $token], 'User register successfully.');
    }

    public function login(LoginRequest $request){
        $user = User::where('email', $request->email)->orWhere('username', $request->username)->first();

        if (!$user || ! Hash::check($request->password, $user->password)) {
            return $this->sendError(['Unauthorised.',
                ['error' => 'User is not found or Password is incorrect']
            ]);
        }

        return $this->sendResponse(['user' => $user, 'access_token' => $user->createToken('user_token')->plainTextToken], 'User login successfully.');
    }

    public function userDetails(){
        $user = Auth::user();
        return $this->sendResponse(['user' => $user], 'User Profile has been sent successfully.');
    }
}