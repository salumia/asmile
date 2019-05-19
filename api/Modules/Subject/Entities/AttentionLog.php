<?php

namespace Modules\Subject\Entities;

use Illuminate\Database\Eloquent\Model;

class AttentionLog extends Model
{
    protected $fillable = [
		'student_id',
		'subject_id',
		'data',
		'page_url'
	];
}
