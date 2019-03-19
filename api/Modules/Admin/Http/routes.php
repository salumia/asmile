<?php

Route::group(['middleware' => 'api', 'prefix' => 'api', 'namespace' => 'Modules\Admin\Http\Controllers'], function()
{
	Route::resource('admin', 'AdminController');//->middleware('auth:api');
	//Route::post('admin/change-password/{user}', 'VendorUserController@changePassword');//->middleware('auth:api');
});

