<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1', 'as' => 'api.', 'namespace' => 'App\Http\Controllers\API\V1'], function ()
{
    Route::post('register', 'AuthAPIController@register');
    Route::post('login', 'AuthAPIController@login');
});

Route::group(['prefix' => 'v1', 'as' => 'api.', 'namespace' => 'App\Http\Controllers\API', 'middleware' => ['auth:sanctum']], function () 
{
    //Auth user APIs
    Route::get('user/profile', 'V1\AuthAPIController@details');
    Route::put('user/change-password', 'V1\AuthAPIController@updatePassword');
    Route::put('user/update-profile', 'V1\AuthAPIController@updateProfile');
    Route::delete('user/delete-profile', 'V1\AuthAPIController@destroy');

    //Recourse APIs
    Route::apiResource('users', 'V1\UsersAPIController');
    Route::apiResource('roles', 'V1\RolesAPIController');
    Route::apiResource('posts', 'V1\PostsAPIController');
});