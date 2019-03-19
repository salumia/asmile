<?php
use Illuminate\Http\Request;

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
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('reset-password', 'PasswordResetController@create');
//   Route::get('find/{token}', 'PasswordResetController@find');
//   Route::post('reset', 'PasswordResetController@reset');
//   Route::post('reset-password', 'Auth\RegisterController@register');
Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('login-admin', 'Auth\AdminLoginController@loginAdmin');
Route::post('logout', 'Auth\LoginController@logout');
Route::post('admin/change-password/{user}', 'AdminController@changePassword');//->middleware('auth:api');
