<?php

Route::group(['middleware' => 'api', 'prefix' => 'api', 'namespace' => 'Modules\Subject\Http\Controllers'], function()
{
	Route::resource('attention-log', 'AttentionLogsController');
	Route::get('subject-sessions/{id}/{subject}', 'AttentionLogsController@getSubjectSessions');
	
	Route::get('teacher-subject/{id}', 'SubjectController@getTeacherSubject');//->middleware('auth:api');   
	Route::resource('subject', 'SubjectController');
	Route::post('subject/disable-subject/{subject}', 'SubjectController@disableSubject');
    Route::post('subject/enable-subject/{subject}', 'SubjectController@enableSubject');
    Route::get('subject-list', 'SubjectController@getSubjectArray');//->middleware('auth:api');               

	
    Route::get('user-subjects/{id}', 'SubjectController@getUserSubjects');//->middleware('auth:api'); 
	
    Route::get('student-subjects/{id}', 'SubjectController@getStudentSubjects');//->middleware('auth:api');          
    Route::get('student-subject-list/{id}', 'SubjectController@getStudentSubjectList');//->middleware('auth:api');          
	Route::get('subject/suggestion/{id}/{query}', 'SubjectController@subjectSuggestionList');
	Route::post('student/assign_subject', 'SubjectController@assignSubject');
	Route::get('student/delete_subject/{id}', 'SubjectController@deleteSubject');
});