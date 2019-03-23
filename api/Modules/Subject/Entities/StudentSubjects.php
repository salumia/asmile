<?php

namespace Modules\Subject\Entities;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;
use Modules\Subject\Entities\Subject;

class StudentSubjects extends Model
{
	use RevisionableTrait;
    protected $fillable = ['id','subject_id','student_id','assigned_by'];	
	
	public function getSubjectData() {
        return $this->belongsTo(Subject::class,'subject_id');
    }
	
}
