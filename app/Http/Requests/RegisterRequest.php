<?php

namespace App\Http\Requests;

class RegisterRequest extends APIRequest
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
            ],
            'email' => [
                'required',
                'unique:users',
            ],
            'password' => [
                'required',
            ],
        ];
    }
}