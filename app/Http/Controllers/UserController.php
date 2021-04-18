<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Report;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = User::get();
        return response()->json($items);
    }

    public function getUser(Request $request)
    {
        //
        $user = DB::table('users')->where(['email' => $request->username, 'password' => $request->password])->first();
        if($user){
            return response()->json(['is'=>'y', 'token'=>$user->remember_token, 'user'=>$user, 'message'=>'Login Succeed!']);
        }
        return response()->json(['is'=>'n', 'token'=>null, 'user'=>null, 'message'=>'Login Failed!']);
    }

    public function verifyToken($token)
    {
        //
        $user = DB::table('users')->where(['remember_token' => $token])->first();
        if($user){
            return response()->json(['is'=>'y', 'token'=>$user->remember_token, 'user'=>$user, 'message'=>'Login Succeed!']);
        }
        return response()->json(['is'=>'n', 'token'=>null, 'user'=>null, 'message'=>'Login Failed!']);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required',
        ]);

        $item = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'email_verified_at' => date("Y-m-d"),
            'password' => Hash::make($validatedData['password']),
            'remember_token' => Str::random(60),
        ]);

        return response()->json("Create Successed!");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $item = User::find($id);
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

    public function update(Request $request, $id)
    {
        //
        $item = User::find($id);
        $item->name = $request->name;
        $item->password = Hash::make($request->password);
        $item->email = $request->email;
        $item->save();

        return response()->json('Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $item = User::find($id);
        $item->delete();

        return response()->json('Successfully Deleted');
    }
}
