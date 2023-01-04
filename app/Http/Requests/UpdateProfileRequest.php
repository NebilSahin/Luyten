<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProfileRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'username' => [
                'string',
                'unique:users,username,' . Auth::user()->id
            ],
            'email' => [
                'string',
                'email',
                'unique:users,email,' . Auth::user()->id,
            ],
            'profile_image' => [
                'image',
                'mimes:jpg,png,jpeg,gif,svg',
                'max:2048'
            ],
        ];
    }
}