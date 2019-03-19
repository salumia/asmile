<?php
Route::group(['middleware' => 'api', 'prefix' => 'api', 'namespace' => 'Modules\Client\Http\Controllers'], function()
{
    Route::get('clients/stats', 'ClientController@getClientStats')->middleware('auth:api');
    Route::get('clients/verify', 'ClientController@verifyOrderId')->middleware('auth:api');
	Route::get('clients/states', 'ClientController@getStates')->middleware('auth:api');
	Route::get('clients/payrollcompanies', 'ClientController@getPayrollCompanies')->middleware('auth:api');
	Route::get('clients/contacts', 'ClientController@getContacts')->middleware('auth:api');
	Route::get('clients/worklist', 'ClientController@getWorkList')->middleware('auth:api');
    Route::resource('clients', 'ClientController')->middleware('auth:api');
    Route::resource('policies', 'PolicyController')->middleware('auth:api');
    Route::resource('contacts', 'ContactsController')->middleware('auth:api');
    Route::resource('policies', 'PolicyController')->middleware('auth:api');
	Route::resource('activities', 'ActivityController')->middleware('auth:api');
    Route::resource('states', 'StateController')->middleware('auth:api');
    Route::resource('class-codes', 'ClassCodeController')->middleware('auth:api');
	
	Route::post('contacts/savecontacts', 'ContactsController@saveContacts')->middleware('auth:api');
	Route::post('contacts/checkEmail', 'ContactsController@checkIfEmailExist')->middleware('auth:api');
});