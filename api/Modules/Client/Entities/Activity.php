<?php

namespace Modules\Client\Entities;

use Illuminate\Database\Eloquent\Model;
use Venturecraft\Revisionable\RevisionableTrait;

class Activity extends Model
{
    use RevisionableTrait;
	protected $table = 'activity_log';
    protected $fillable = ['description','type','client_id','user_id'];
	
	public function user()
    {
		return $this->hasOne(User::class,'id','user_id');
    }
}
