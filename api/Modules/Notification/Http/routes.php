<?php
Route::group(['middleware' => 'api', 'prefix' => 'api', 'namespace' => 'Modules\Notification\Http\Controllers'], function()
{
	Route::resource('notification', 'NotificationController');//->middleware('auth:api');
	Route::get('notification/user/{id}/{role}', 'NotificationController@userNotifications');
	Route::post('notification/view/user/{id}', 'NotificationController@disableNotification');
});
