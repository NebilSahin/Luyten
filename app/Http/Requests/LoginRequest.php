<?php

namespace App\Http\Requests;

class LoginRequest extends APIRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'email'     => 'string|email',
            'username'  => 'string',
            'password'  => 'required'
        ];
    }

}