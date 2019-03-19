<?php

Route::group(['middleware' => 'web', 'prefix' => 'sc', 'namespace' => 'Modules\SC\Http\Controllers'], function()
{
    Route::get('/', 'SCController@index');
});
