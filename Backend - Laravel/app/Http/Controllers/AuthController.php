<?php

namespace App\Http\Controllers;

use App\Models\User;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function test()
    {
        return "aoufi";
    }
    //this method adds new users
    public function createAccount(Request $request)
    {
        $attr = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed'
        ]);

        $user = User::create([
            'name' => $attr['name'],
            'password' => bcrypt($attr['password']),
            'email' => $attr['email']
        ]);

        $token = $user->createToken('token')->plainTextToken;
        $response = [
            "user" => $user,
            "token" => $token
        ];
        return Response($response, 201);
    }
    //use this method to signin users
    public function signin(Request $request)
    {
        $attr = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:8'
        ]);

        $user = User::where("email", $attr["email"])->first();

        if (!$user || !Hash::check($attr["password"], $user->password)) {
            return response([
                "message" => "bad cred"
            ], 401);
        }

        $token = $user->createToken('token')->plainTextToken;
        $response = [
            "user" => $user,
            "token" => $token
        ];
        return Response($response, 201);
    }

    // this method signs out users by removing tokens
    public function signout()
    {


        auth()->user()->currentAccessToken()->delete();

        return [
            'message' => 'Logged Out'
        ];
    }
}