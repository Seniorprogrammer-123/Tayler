<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
Route::post('/signup', [App\Http\Controllers\AuthController::class, 'signup']);
Route::resource('/report', 'App\Http\Controllers\ReportController');

Route::get('/users/{id}/edit', [App\Http\Controllers\UserController::class, 'edit']);
Route::put('/users/{id}', [App\Http\Controllers\UserController::class, 'update']);
Route::post('/users/create', [App\Http\Controllers\UserController::class, 'store']);
Route::delete('/users/{id}', [App\Http\Controllers\UserController::class, 'destroy']);
Route::get('/users', [App\Http\Controllers\UserController::class, 'index']);
Route::get('/getbydate/{month}/{year}/{name}', [App\Http\Controllers\ReportController::class, 'getbydate']);
Route::get('/getbymonth/{year}/{name}', [App\Http\Controllers\ReportController::class, 'getbymonth']);
