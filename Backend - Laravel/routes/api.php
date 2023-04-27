<?php

use App\Http\Controllers\PlagiatController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/register', [AuthController::class, 'createAccount']);

Route::post('/login', [AuthController::class, 'signin']);


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::middleware('auth:sanctum')->post("/plagiat/{type}", [PlagiatController::class, 'store'])->where('type', 'text|file');

    Route::get("/user-plagiat-Checks", [PlagiatController::class, 'userPlagiatChecks']);

    Route::delete("/plagiat/{id}", [PlagiatController::class, 'destroy']);

    Route::post('/logout', [AuthController::class, 'signout']);
});