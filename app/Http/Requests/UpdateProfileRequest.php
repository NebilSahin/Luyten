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
                'required',
                'unique:users,username,' . Auth::user()->id
            ],
            'email' => [
                'required',
                'string',
                'email',
                'unique:users,email,' . Auth::user()->id,
            ],
            'password' => [
                'required',
            ],
        ];
    }
}