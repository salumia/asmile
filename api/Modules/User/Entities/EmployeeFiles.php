<?php

namespace Modules\User\Entities;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class EmployeeFiles extends Model
{
	use RevisionableTrait;
    protected $fillable = ['id','name','original_name','user_id'];
}
