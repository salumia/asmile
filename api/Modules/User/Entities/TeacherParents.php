<?php

namespace Modules\User\Entities;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;
use App\User as User;

class TeacherParents extends Model
{
	use RevisionableTrait;
    protected $fillable = ['id','teacher_id','parent_id'];
	
	public function getParentData() {
        return $this->belongsTo(User::class,'parent_id');
    }
}
