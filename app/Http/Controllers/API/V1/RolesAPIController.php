<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;

class RolesAPIController extends Controller
{
    public function index()
    {
        $roles = Role::all();
        return new RoleResource($roles);
    }

    public function store(Request $request)
    {
        $role = Role::create($request->all());
        return new RoleResource($role);
    }

    public function show($id)
    {
        $role = Role::find($id);
        return new RoleResource($role);
    }


    public function update(Request $request, $id)
    {
        $role = Role::find($id)->update($request->all());
        return new RoleResource($role);
    }

    public function destroy($id)
    {
        $role = Role::find($id)->delete();
        return new RoleResource($role);
    }
}