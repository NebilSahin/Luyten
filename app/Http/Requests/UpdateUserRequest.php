<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
                'unique:users',
            ],
            'role_identifier' => [
                'bigInteger',
            ],
        ];
    }
}