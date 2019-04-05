<?php

namespace Modules\User\Entities;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;
use App\User as User;

class TeacherStudents extends Model
{
	use RevisionableTrait;
    protected $fillable = ['id','teacher_id','student_id', 'assigned_by'];
	
	public function getStudentData() {
        return $this->belongsTo(User::class,'student_id');
    }
}
