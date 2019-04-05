<?php

Route::group(['middleware' => 'api', 'prefix' => 'api', 'namespace' => 'Modules\User\Http\Controllers'], function()
{
	Route::post('student-login', 'UserController@studentLogin');
	Route::post('listing/{role}', 'UserController@listing');//->middleware('auth:api');
    Route::resource('users', 'UserController');//->middleware('auth:api');
    Route::post('users/change-password/{user}', 'UserController@changePassword');//->middleware('auth:api');
    Route::post('users/logout-user/{user}', 'UserController@logoutUser')->middleware('auth:api');
    Route::post('users/disable-user/{user}', 'UserController@disableUser');//->middleware('auth:api');
    Route::post('users/enable-user/{user}', 'UserController@enableUser');//->middleware('auth:api');
	Route::post('users/checkUsername', 'UserController@checkIfUsernameExist');
	Route::post('users/checkEmail', 'UserController@checkIfEmailExist');
	Route::post('create_link', 'UserController@createStudentTeacherLink');	
	Route::get('student/suggestion/{id}/{query}/{userId}', 'UserController@suggestionList');
	
	Route::post('upload', 'UserController@uploadProfile');
	Route::post('delete-profile', 'UserController@deleteProfile')->middleware('auth:api');
	
	Route::get('getUserStudents/{id}', 'UserController@getUserStudents');//->middleware('auth:api');
	Route::get('remove_student/{index}', 'UserController@removeStudent');//->middleware('auth:api');

	Route::get('getTeacherParents/{id}', 'UserController@getTeacherParents');//->middleware('auth:api');
	Route::get('remove-parent/{index}', 'UserController@removeParent');//->middleware('auth:api');
	
	Route::post('create_teacher-parent-link', 'UserController@createParentTeacherLink');
	Route::get('parent/suggestion/{id}/{query}/{userId}', 'UserController@parentSuggestionList');
	
});
