<?php

Route::group(['middleware' => 'api', 'prefix' => 'api', 'namespace' => 'Modules\Subject\Http\Controllers'], function()
{
	Route::resource('subject', 'SubjectController');
	Route::post('subject/disable-subject/{subject}', 'SubjectController@disableSubject');
    Route::post('subject/enable-subject/{subject}', 'SubjectController@enableSubject');
    Route::get('subject-list', 'SubjectController@getSubjectArray');//->middleware('auth:api');          
});