<?php

namespace Modules\User\Entities;

use Illuminate\Database\Eloquent\Model;
use App\User as User;

class Leave extends Model
{
    protected $fillable = [
		'from_date',
		'to_date',
		'from_day_type',
		'to_day_type',
		'leave_type',
		'reason',
		'status',
		'user_id'
	];
	
	public function getUserData() {
        return $this->belongsTo(User::class,'user_id');
    }
}
