<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1', 'as' => 'api.', 'namespace' => 'App\Http\Controllers\API'], function (){
    Route::post('register', 'AuthAPIController@register');
    Route::post('login', 'AuthAPIController@login');
});

Route::group(['prefix' => 'v1', 'as' => 'api.', 'namespace' => 'App\Http\Controllers\API', 'middleware' => ['auth:sanctum']], function () {
    Route::get('user/details', 'AuthAPIController@userDetails');

    Route::apiResource('users', 'V1\UsersAPIController');

});


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });