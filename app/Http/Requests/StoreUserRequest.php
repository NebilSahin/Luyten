<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
                'unique:users',
            ],
            'email' => [
                'string',
                'required',
                'unique:users',
            ],
            'password' => [
                'required',
            ],
            'role_identifier' => [
                'bigInteger',
                'required',
            ],
        ];
    }
}