<?php

namespace Modules\Subject\Entities;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = [
		'name',
		'status'
	];
}
